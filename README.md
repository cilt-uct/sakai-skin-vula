# Vula Skin based on Morpheus for Sakai

## Installation and Deployment

- You will need to install NodeJS (which includes npm).

- Before setting up the local server ensure that your npm is up-to-date (this might require sudo on certain systems):

  `npm update -g npm`

- Install project dependencies.

  `npm install -g grunt-cli`
  `npm install`

- Copy `config-dist.json` to `config.json`.

  `cp config-dist.json config.json`

- Fill in the properties in the configuration file.

### To Deploy

`grunt deploy`

### Live Editing

`grunt`

## Developement

1. Get the update from the Sakai repository (`/library/source/morpheus-master`) and overwrite the contained `morpheus-master` folder.
2. Copy the assets folder from `./morpheus-master/bootstrap-sass-x/` and overwrite the assets folder in `bootstrap-sass`.
3. Copy the assets folder from `./morpheus-master/font-awesome-sass-x/` and overwrite the assets folder in `font-awesome-sass`.
4. Update `./images` and `./js` with versions from `./morpheus-master/images` and `./morpheus-master/js`.
5. Copy `./morpheus-master/sass` to `./sass` and review the changes.

NOTE:
[How to get the skin to compile and deploy on SLE 11 SP4](./SLE11_SP4.md)

## Install Node and Sass (Ubuntu 16.04)

Ref for node install: https://github.com/nodesource/distributions

```
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
bash nodesource_setup.sh
apt-get install gcc g++ make
apt-get install build-essential
apt-get install nodejs

nodejs --version
npm --version

apt install ruby-full rubygems autogen autoconf libtool make
gem install sass
sass -v (Ruby Sass 3.7.4)
```

## Morpheus for Sakai

Morpheus (Mobile Optimized Responsive Portal for Higher Education Using Sass) is the new responsive design portal (the primary UI) for Sakai (from 11 onwards).

## Documentation about morpheus:
 - [Technologies](./morpheus-master/technologies.md) [Spanish version](./morpheus-master/technologies.es.md)
 - [Folder structure and files](./morpheus-master/folder-structure.md) [Spanish version](./morpheus-master/folder-structure.es.md)
 - [Compiling my own skin with maven](./morpheus-master/compile-skin.md)
 - [Adding a tool to Morpheus](./morpheus-master/customization-tool.md)