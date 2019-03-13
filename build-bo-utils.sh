#!/bin/bash
cd ../bo-utils
source ~/.profile
nvm use
npx babel-node index.js
npx webpack
