# Contribution notes


## Publish
### Setup environment for publishing
Prep development environment using [electron-builder instructions](https://github.com/electron-userland/electron-builder/wiki/Publishing-Artifacts)

### Github Publish Pre-Release
Executing the below command from a terminal will build and publish in pre-release mode to Github using setting in package.json    
`|> npm run release`  
After the command runs and publishes to Github, login to Github and flip the release from draft to publish.

