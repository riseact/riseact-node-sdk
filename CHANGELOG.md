## Changelogs
    
### 1.0.0
- Initial release
 
### 2.0.0
- Handle authentication
 
### 3.0.0
- Added webhooks

### 4.0.0
- Added mandatory support for organization slugs 

### 5.0.0
Complete rewrite of the package

- Migrated from org id-based logic to domain-based logic (only) 
- Removed useless dependencies 
- Enhanced authentication flow & fixed minor bugs
- Enhanced refresh token flow on error
- Provided development tools to develop and test the package
- Documentation improvements
- Created the `startRiseactApp` function to condense the app start logic
- Now `appPublicUrl` is mandatory

### 5.0.4
- Added `onInstall` callback with `gqlClient`, `domain` and `credentials` parameters
- Fixed some type issues

### 5.1.0
- Separate `onInstall` and `setCredentials` calls to ensure `onInstall` is called with fresh credentials before storing with `setCredentials`

### 5.1.1
- Minors on logging
- Removes strict restrictions on node version

### 6.0.0
- Auth flow refactor. Removed state cookies for oauth, now using internal server side cache. (details in src/auth/README.md)
- Now using only Authorization headers with Bearer tokens for rest and graphql clients