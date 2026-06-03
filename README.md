# Vula Skin based on Default Sakai Skin

## Installation and Deployment

- You will need to install NodeJS (which includes npm).

- Before setting up the local server ensure that your npm is up-to-date (this might require sudo on certain systems):

  `npm install -g npm`

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

## Development

1. Get the update from the Sakai repository (`/sakai/library/src`) and overwrite the contained `skins` and `webapp` folders.
2. Copy the folders (`skins` and `webapp`) into `./base/` and overwrite the files.
3. Review the changes and apply to `./skin/` folder.

## Install Node and Sass (Ubuntu)

```
sudo apt update && sudo apt install nodejs npm

nodejs --version
npm --version

apt install ruby-full rubygems autogen autoconf libtool make
gem install sass
sass -v (Ruby Sass 3.7.4)
```

## UCT Specific Files
```
...
```

## For Apache

In `/etc/apache2/sites-enabled/[sitename].uct.ac.za.conf`

```
RewriteRule   ^/library/skin/default/tool.css  /library/skin/vula/tool.css   [R]
```
