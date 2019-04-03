#!/bin/bash
cd ../bo-datatable
source ~/.profile
nvm use
npm link ../bo-utils
npm run build:prod
