#!/bin/bash
source ~/.profile
nvm use
npm link ../bo-datatable
npm link ../bo-utils
npm run start:prod
