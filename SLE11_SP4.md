# Vula Skin based on Morpheus for Sakai

## How to get the skin to compile and deploy on SLE 11 SP4

```
cat /etc/*release*
zypper ar -f -n nodejs6 http://download.opensuse.org/repositories/devel:/languages:/nodejs/SLE_11_SP4/devel:languages:nodejs.repo
zypper ref
zypper install nodejs
zypper install openssl
zypper install nodejs
zypper ar -f http://download.opensuse.org/repositories/home:/garloff:/OTC:/curl/SLE_11_SP4/home:garloff:OTC:curl.repo
zypper ref
zypper install openssl1
zypper install libopenssl1
zypper install libopenssl1_0_0
zypper install libopenssl1_0_0-1.0.2h-8.1.x86_64
zypper install nodejs
sudo zypper ar http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_11.4/  Node.js
sudo zypper in nodejs nodejs-devel

bash install_node.sh

npm

cd /usr/local/src/vula-skin-11x/
npm install
npm install -g grunt-cli
grunt deploy
```

If all goes well it should work.

*else*

Sass is a preprocessor that adds nested rules, variables, mixins and functions, selector inheritance, and more to CSS. Sass files compile into well-formatted, standard CSS to use in your site or application.

This task requires you to have Ruby and Sass installed. If you're on OS X or Linux you probably already have Ruby installed; test with ruby -v in your terminal. When you've confirmed you have Ruby installed, run gem install sass to install Sass.

````
zypper install ruby
sudo zypper ar http://download.opensuse.org/repositories/home:/janhebler:/puppet-migration/SLE_11_SP4/
sudo zypper ar http://download.opensuse.org/repositories/home:/janhebler:/puppet-migration/SLE_11_SP4/ Ruby
zypper ref
zypper install ruby
zypper install ruby-2.2-3.2.x86_64
zypper install ruby-1.8.7.p357-0.9.17.1.x86_64
zypper install ruby-2.2-3.2.x86_64
zypper install libyaml-0-2-0.1.6-15.1
zypper install ruby-2.2-3.2.x86_64

ruby -v

sudo su -c "gem install sass"

npm install grunt-contrib-sass --save-dev
```