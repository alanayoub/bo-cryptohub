#!/bin/bash
cd ../bo-datatable
source ~/.profile
nvm use
npm link ../bo-utils
npx webpack
