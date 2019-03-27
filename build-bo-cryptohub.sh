#!/bin/bash
source ~/.profile
nvm use
npm link ../bo-dataTable
npm link ../bo-utils
npx webpack
