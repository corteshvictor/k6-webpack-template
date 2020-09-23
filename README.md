Pasos para ejecutar:

- Generar el build

```sh
npm run build
```

- Ejecutar modo de compatibilidad. Lo puedes ejecutar con

```sh
K6_COMPATIBILITY_MODE=base k6 run dist/getCharacter.es5.js
```

o

```sh
k6 run --compatibility-mode=base dist/getCharacter.es5.js
```

Dependencias de desarrollo que estoy utilizando.

```
npm i -D @babel/core @babel/preset-env babel-loader webpack webpack-cli
```
