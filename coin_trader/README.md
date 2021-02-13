> na raiz deste projeto, existe o arquivo ``coin_trader_production.apk``. Ele pode ser utilizado para testar o aplicativo. Mas de qualquer forma, abaixo há um passo a passo de como gerar uma nova apk

## COIN_TRADER

----
Aplicativo utilizado para registrar as suas ordens de compra e venda de bitcoins. Utilizando a cotação atual da criptomoeda, o aplicativo automaticamente calcula os seus lucros e suas perdas baseado na quantidade de unidades que você possuir.

---

### configurações de ambiente
configurações de ambiente utilizadas durante o desenvolvimento:
```json
SO: Ubuntu 20.04.2 LTS
openjdk: version 11.0.9.1 - 2020-11-04
npm: 6.13.4
nvm: 0.35.2
node: 12.16.1
--------------
react: 16.11.0 
react-native: 0.62.2 
```
 
 ---
### Uso em ambiente local (debug)
instale as dependências do projeto <br />
```bash
yarn
```
 
execute o servidor local do react <br />
```bash
yarn start --reset-cache
```

rode o aplicativo em um emulador ou aparelho físico <br />
```bash
yarn android 
- ou - 
npx react-native run-android
```

#### debugando o redux
para inspecionar a estrutura da store, e chamada de actions do redux, você irá precisar da extensão [Redux Devtools](https://addons.mozilla.org/pt-BR/firefox/addon/reduxdevtools/) instalada no seu navegador.

Com a extensão instalada, no seu terminal, execute o comando
```bash
yarn dev
``` 


Este comando irá executar um servidor na porta **_8000_** 

Clique com o botão direito na extensão _ReduxDevtools_ e depois clique em ``open remote devtools`` <br/>
Um novo popup irá abrir.

Com o popup aberto, no seu emulador ou aparelho fisico, habilite o modo ``debug`` do react.
Quando o aplicativo carregar novamente, você poderá ver no popup, a estrutura atual da store do react, e em tempo real, as actions que são executadas.

> **_Obs:_** caso não surja nenhum efeito no popup, clique em `settings` na canto inferior direito, e adicione a porta **_8000_** no input. Salve e dê um refresh no aplicativo. 

---

### Uso em ambiente de produção.
**Buildar a apk**
```bash
yarn android:build
```

Caso o build apresente alguma falha, execute o comando abaixo, e tente novamente.
```bash
yarn android:clean
```

**Instalar a versão gerada** <br/>
Para instalar a apk gerada, você precisa ter o [adb](https://developer.android.com/studio/command-line/adb?hl=pt-br) configurado no seu ambiente. <br/>
Com o adb devidamente configurado, execute o comando
```bash
yarn android:install 
```
Lembrando que este comando só funcionará caso você possua somente um dispositivo android conectado, seja emulador ou aparelho físico. 

---

### Ferramentas de debug utilizadas

* **Reactotron** - v3.0.0-beta.9 - [link](https://github.com/infinitered/reactotron/releases/tag/v3.0.0-beta.9)
* **Redux Devtools** - v2.17.1 - [link](https://addons.mozilla.org/pt-BR/firefox/addon/reduxdevtools/)
* **Remotedev server** - v0.3.1 - [link](https://www.npmjs.com/package/remotedev-server)

---

### Thirdparty - Bibliotecas utilizadas / componentes

* react-native-splash-screen
* styled-components
* react-native-currency-input

---

### Thirdparty - Bibliotecas utilizadas / utils ou core

* @react-native-community/async-storage
* @react-native-community/clipboard
* @react-navigation/native
* apisauce
* intl
* lodash
* react-redux
* redux
* redux-persist
* redux-thunk
