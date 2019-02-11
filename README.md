### dev
clear && npx babel-node --inspect --harmony_async_iteration --use-strict ./src/index.js

### prod
clear && node --harmony_async_iteration --use-strict ./src/index.js

### lint
npx eslint src/index.js

### pack
webpack
