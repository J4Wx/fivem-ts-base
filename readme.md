# FiveM TypeScript Base

This is a very simple base for FiveM typescript projects to use.

## How to use it:

* Simply create your resource categories inside the src/resources folder.
* Then create your resources inside of a resource category.
* Then create a "client" folder and/or a "server" folder as required.
* Then run yarn build!

All your resource categories/resources will be output to ./resources for you to symlink over to your FXServer.

If a resource contains a __resource.lua it will be included. Otherwise it will not. All assets within a resource will be copied directly into the output. Except for TypeScript files which will be built and concatenated into server_main.js and client_main.js depending on which folder it is from.

Other files can be included in src for use as shared libs within those files, and they'll be included as you'd expect from a TypeScript compiler.

## Commands
* yarn clean - This will delete the contents of ./resources
* yarn build - This will create the contents of ./resources

Running yarn build automatically runs clean to ensure a clean output.
