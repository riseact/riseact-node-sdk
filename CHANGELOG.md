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