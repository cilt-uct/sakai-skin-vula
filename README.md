# Vula Skin based on Morpheus for Sakai

## installation

- You will need to install NodeJS (which includes npm).

- Before setting up the local server ensure that your npm is up-to-date (this might require sudo on certain systems):

  `npm update -g npm`

- Install project dependencies.

  `npm install`

- Copy `config-dist.json` to `config.json`.

  `cp config-dist.json config.json`

- Fill in the properties in the configuration file.

### To Deploy

`grunt deploy`

### Live Editing

`grunt`


## Morpheus for Sakai

Morpheus (Mobile Optimized Responsive Portal for Higher Education Using Sass) is the new responsive design portal (the primary UI) which will be available in Sakai 11 (and is in a preview state for Sakai 10). The neo portal is the portal which was developed and released for Sakai 2.9. Before that the portal was known as the Charon portal.

## Documentation about morpheus:
 - [Technologies](./technologies.md) [Spanish version](./technologies.es.md)
 - [Folder structure and files](./folder-structure.md) [Spanish version](./folder-structure.es.md)
 - [Compiling my own skin with maven](./compile-skin.md)
 - [Adding a tool to Morpheus](./customization-tool.md)

## Fixing methods for tools

There's a confluence page created to help developers to approach fixing tools. Maybe want to read it [https://confluence.sakaiproject.org/display/QA/How+can+I+fix+a+tool+in+Morpheus]