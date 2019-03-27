#!/bin/bash
source ~/.profile
nvm install 9.11.1
nvm alias default 9.11.1

./build-bo-utils.sh
./build-bo-datatable.sh
./build-bo-cryptohub.sh

clear && NODE_ENV=development && npx babel-node --inspect --use-strict ./src/index.js
