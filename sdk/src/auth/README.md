# Riseact apps auth flow

This directory contains the code for handling authentication in Riseact apps. It includes functions for generating authorization URLs, handling redirects, and managing tokens.

1. From Riseact Admin portal, user goes to the admin page.
2. Admin portal opens the app in iframe, adding `__organization` in query params. 
3. Static files from the app are served, app is loaded in iframe.
4. Frontend app looks for `ra_app_organization` and `ra_app_client_token` in local storage.
    - If not found, app redirects to app backend to `/oauth/authorize?__organization=...`
    - If found but `__organization` does not match with `ra_app_organization`, app clears local storage and redirects to `/oauth/authorize?__organization=...` 
    - If found, keep loading protected routes in `Router`

## Get client token flow:
1. Backend receives the request in `authorizeHandler`, extracts `__organization` from query params.
2. Backend generates pkce code verifier and challenge, stores the code verifier in a temporary cache with TTL and generates a random state string.
3. Backend redirects to the authorization URL of the identity provider (Riseact account), adding the `state` param and standard oauth+pkce params.
4. User authenticates in the identity provider, which redirects back to the backend's redirect URI with `state` params and standard oauth params.
5. Backend receives the request in `callbackHandler`, extracts the `state` param and looks up the code verifier from the temporary cache.
6. If found, backend exchanges the authorization code for tokens using the code verifier.
7. Backend generates a client token and stores it in a temporary cache with TTL, associated with a unique identifier (sid) that send as hash param to app client.
8. Backend redirects to `/auth/get-token#sid=...`
9. NB: the route `/auth/get-token#sid=...` is intercepted and served directly by Riseact SDK, which serves a static HTML+JS that extracts the `sid` from the URL hash and makes a POST request to `/auth/sid-exchange`, getting the client token in response and storing it in local storage. After that, it redirects to `/`.
10. Frontend app is reloaded, now finding the `ra_app_client_token` in local storage and loading protected routes in `Router`.