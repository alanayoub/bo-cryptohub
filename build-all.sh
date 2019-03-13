#!/bin/bash
source ~/.profile
nvm use
./build-bo-utils.sh
./build-bo-datatable.sh

cd ../cryptohub
./build-bo-cryptohub.sh
