![](https://github.com/alanayoub/bo-cryptohub/blob/master/graphics/screenshots/Screenshot_002.png)

https://www.youtube.com/watch?v=NABFf5wNTM4&t=101s

### env
```
source ~/.profile
nvm use
```
### start dev
```
clear && NODE_ENV=development && npx babel-node --inspect --harmony_async_iteration --use-strict ./src/index.js
```

### start prod
```
clear && NODE_ENV=production && node --harmony_async_iteration --use-strict ./src/index.js
```

### lint
```
npx eslint src/index.js
```

### pack
```
npx webpack
```

### setup npm links
```
cd cryptohub
npm link ../bo-datatable
npm link ../bo-utils
cd bo-datatable
npm link ../bo-utils
```

### ascii art generator
```
http://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=BinaryOverdose
```
