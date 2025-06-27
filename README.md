# riseact-node-sdk

Riseact SDK for Node.js to develop Riseact apps.


## Installation

```bash
npm install @riseact/riseact-node-sdk
# or
yarn add @riseact/riseact-node-sdk
```

### Peer dependencies

Install the following peer dependencies if you don't have them already:

```bash
npm install express@^4.18
# or
yarn add express@^4.18
```

## Usage

Refer to [riseact-app-template-node](https://github.com/riseact/riseact-app-template-node/tree/master) repo for a complete example of how to use this SDK in a Node.js app.

```ts

const RiseactConfig: RiseactConfig = {
  // Provide your application ID and secret from Riseact
  auth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  storage: {
    // Memory, file or custom storage. For custom, you need to define the adapters
    type: 'file', 
  },

  network: {
    // The URL of the Riseact API. Use the public URL for production and ngrok URL/tunnel for development.
    appPublicUrl: process.env.RISEACT_APP_URL,
  },

  // Optional: In development, you can define custom paths for the Vite configuration and root directory of your client application.
  ...(process.env.NODE_ENV === 'development' && {
    dev: {
      // Provide the path to your Vite configuration file and the root directory of your client application.
      viteConfig: {
        root: path.join(process.cwd(), '../client'),
        configFile: path.join(process.cwd(), '../client/vite.config.ts'),
      },
    },
  }),
};


async function createServer() {
  const app: Express = express();

  // Create the Riseact SDK instance with the client ID and client secret generated from Riseact
  const riseact = await initRiseactSDK(RiseactConfig);

  // Creare a public router for public endpoints
  const publicEpsRouter = express.Router();
  publicEpsRouter.use(
    riseact.network.registerWebhook(WebhookEventTopic.SupporterCreated, (data) => {
      console.log('Webhook received', data);
    }),
  );

  // Create a protected router for private endpoints (request inside Riseact Admin iframe)
  const privateEpsRouter = express.Router();
  privateEpsRouter.get('/api/hello', (req, res) => {
    res.send('Hello World!');
  });
  privateEpsRouter.get('/api/organization-info', OrganizationInfoHandler(riseact));
  privateEpsRouter.get('/api/organization-credentials', OrganizationCredentialsHandler());

  // Start the Riseact app
  riseact.utils.startRiseactApp(app, riseact, {
    publicRouter: publicEpsRouter,
    protectedRouter: privateEpsRouter,
    serverPort: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000,
  });
}

createServer();

```


### GQL Client

For information about the Riseact GQL Schema, explore it yourself with [ApolloStudio](https://studio.apollographql.com/sandbox/explorer) typing `https://core.riseact.org/admin/graphql/`

```ts
const ORGANIZATION_INFO_QUERY = graphql(`
  query GetOrganizationInfo {
    organization {
      name
      logo {
        square
      }
    }
  }
`);

export const OrganizationInfoHandler = async (req, res) => {
    // Create a GraphQL client for the user's organization
    const graphqlClient = await req.riseact.network.createGqlClient(req.organizationDomain);

    // Get the organization type from the common package
    const { data, error } = await graphqlClient.query<OrganizationInfoResponseQuery>({
      query: ORGANIZATION_INFO_QUERY,
    });

    if (error) {
      return res.status(500);
    }

    // Return the organization data
    res.json({
      name: data.organization.name,
      logoUrl: data.organization.logo?.square,
    });
  }
```



## Development


**Authentication Architecture**

* **Actors**

  * **Client**: browser SPA, server inside the Riseact Admin application iframe
  * **App backend**: Node server under your control
  * **Riseact API**: external GraphQL service with OAuth 2 (Authorization-Code + PKCE).

* **Auth flow**

  1. App client hits an app backend route; the backend redirects it to Riseact’s authorize endpoint with code-challenge.
  2. Riseact calls the backend callback with the OAuth credentials.
  3. Backend generates a long-lasting **client token**, stores it together with Riseact credentials, and returns the client token to the browser as a cookie.

* **Requests flow from the client**

  1. App client sends a GraphQL HTTP request to the App backend, attaching its client token cookie.
  2. Backend looks up the stored Riseact credentials by that token and forwards the original request to Riseact adding `Authorization: Bearer <access_token>`.
  3. Riseact answers; backend streams the response back to the browser unchanged.

* **Transparent token-renewal loop**

  * If Riseact returns an auth error (token expired or revoked), the backend:
    1. Performs a single-flight refresh with the stored `refresh_token`.
    2. Retries the identical request with the new `access_token`.
    3. On success, relays the data to the client; on failure (refresh denied) it redirects the browser to restart the OAuth flow.
   
  * This approach covers both normal expiry and out-of-band revocation without relying on local expiry timestamps.

* **Two query surfaces available**

  1. **Frontend → App Backend → Riseact**

     * Browser always calls the backend; backend proxies to Riseact.
     * No Riseact tokens ever reach the browser.
     * Suits browser-only environments, keeps CORS simple.

  2. **Backend-only queries**

     * Internal services within the app backend can call Riseact directly using the same stored credentials—no proxy hop and no client token involved.
     * Ideal for scheduled jobs or server-to-server logic.


### Auth flow

### Authentication Flow

`authMiddleware` secures every request originating from the **Riseact Admin** iframe, which always appends `__organization=<org-domain>` to the URL.
The auth middleware does the following:

1. Intercept the **`/oauth/authorize` route**

   1. Rejects with **400** if `__organization` is absent.
   2. Determines `redirect_uri` from the `appPublicUrl` provided in configuration
   3. Instantiates an OAuth client with `client_id`, `client_secret`, and the computed `redirect_uri`.
   4. Generates a PKCE `code_verifier` via **openid-client**.
   5. Sets cookie `X-Riseact-Sdk-Code-Verifier` that stores the `code_verifier` and the organization domain.
   6. Redirects the browser to Riseact’s authorization endpoint.
2. Intercept the **`/oauth/callback` route**

   1. Requires the `X-Riseact-Sdk-Code-Verifier` cookie (returns **401** if missing).
   2. Validates the saved `code_verifier` against the `code_challenge`. If invalid returns **403**.
   3. Extracts `access_token`, `refresh_token`, and `expires_in` from the query string.
   4. Computes `expires_at` from `expires_in` + `now()`.
   5. Generates a UUID v4 `client_token`.
   6. Save `{ access_token, refresh_token, client_token, expires_in, expires_at, organization_domain }` in the storage.
3. **All other routes**

   1. Looks for a `X-Riseact-Sdk-Token` cookie; if absent, redirects to `/oauth/authorize?__organization=<org-domain>`.
   2. JSON-parses the cookie and validates `client_token` and `organization_domain`.
   3. Retrieves credentials by `client_token`; if missing, redirects to authorize.
   4. Ensures the cookie’s `organization_domain` matches the stored record; if mismatch, redirects to `/authorize`
   5. Adds `req.organizationDomain` and calls `next()`.

#### Stored credential model

| Field                 | Purpose                                   |
| --------------------- | ----------------------------------------- |
| `access_token`        | Bearer token for Riseact GraphQL calls    |
| `refresh_token`       | Used to renew the access token            |
| `client_token`        | Long-lived identifier for the browser     |
| `expires_in`          | TTL of the current access token (seconds) |
| `expires_at`          | UTC timestamp when the token expires      |
| `organization_domain` | Tenant identifier                         |

`createGqlClient` consumes these credentials to build an authenticated Apollo client for Riseact. It automatically handles token renewal and retries failed requests.




#### Riseact errors

Riseact backend do not throw errors. If user is not authenticated, it respond with a 200 with this payload:

```json
{
    "data": null,
    "errors": [
        {
            "message": "User is not authenticated",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "path"
            ]
        }
    ]
}
```


## License

MIT