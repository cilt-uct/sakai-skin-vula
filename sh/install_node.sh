#! /bin/bash
# run it by: bash install-node.sh

cd /opt

read -p " which version of Node do you need to install: enter 0.10.24, 0.12.9, or 4.2.2 (or any other valid version): " VERSIONNAME
read -p " Are you using a 32-bit or 64-bit operating system ? Enter 64 or 32: " ARCHVALUE
if [[ $ARCHVALUE = 32 ]]
    then
    printf "user put in 32 \n"
    ARCHVALUE=86
    URL=http://nodejs.org/dist/v${VERSIONNAME}/node-v${VERSIONNAME}-linux-x${ARCHVALUE}.tar.gz

elif [[ $ARCHVALUE = 64 ]]
    then
    printf "user put in 64 \n"
    ARCHVALUE=64
    URL=http://nodejs.org/dist/v${VERSIONNAME}/node-v${VERSIONNAME}-linux-x${ARCHVALUE}.tar.gz

else
    printf "invalid input expted either 32 or 64 as input, quitting ... \n"

    exit
fi

# setting up the folders and the the symbolic links
printf $URL"\n"
ME=$(whoami) ; sudo chown -R $ME /usr/local && cd /usr/local/bin #adding yourself to the group to access /usr/local/bin
mkdir _node && cd $_ && wget $URL -O - | tar zxf - --strip-components=1 # downloads and unzips the content to _node
cp -r ./lib/node_modules/ /usr/local/lib/ # copy the node modules folder to the /lib/ folder
cp -r ./include/node /usr/local/include/ # copy the /include/node folder to /usr/local/include folder
mkdir /usr/local/man/man1 # create the man folder
cp ./share/man/man1/node.1 /usr/local/man/man1/ # copy the man file
cp bin/node /usr/local/bin/ # copy node to the bin folder
ln -s "/usr/local/lib/node_modules/npm/bin/npm-cli.js" ../npm ## making the symbolic link to npm

# print the version of node and npm
node -v
npm -v