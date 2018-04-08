# ax-cordova-vue

> A Cordova && Vue.js Project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9000
npm run dev

# build web page
npm run build -- <platform> <env>
<platform>: web mobile
<env>: test uat prod

# build android app

# signed for test
npm run pack:android.prod

# unsigned for release
npm run release:android.prod
# signed for release
jarsigner -verbose -keystore <signed.keystore> -signedjar <signed-app-path> <unsigned-app-path> <password>
