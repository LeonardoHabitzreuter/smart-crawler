# Smart Crawler!

Esta api é responsável por buscar informações no site da [Smart MEI](https://www.smartmei.com.br)

## Rodando a aplicação:

### *Em modo desenvolvimento*

+ **Instale as dependências**
  ```
  yarn
  ```

+ **Então rode o comando para subir a api**
  ```
  yarn dev
  ```

  Ou, se preferir usar o docker:
  ```
  docker image build -t smart-crawler -f dev.Dockerfile .
  ```
  ```
  make run-dev
  ```
A aplicação rodará o playground na porta [3000](http://localhost:3000)

### *Em modo produção*

+ **Utilizando o yarn**
  ```
  yarn
  ```
  ```
  yarn build
  ```
  ```
  yarn start
  ```

+ **Ou se preferir, utilize o docker**
  ```
  docker image build -t smart-crawler .
  ```
  ```
  make run-prod
  ```
A aplicação estará rodando na porta [3000](http://localhost:3000)

*Obs: A api não disponibiliza playground em modo produção*

---

## Testes:
+ ### Testes unitários
  ```
  yarn test
  ```

+ ### Testes de integração
  ```
  yarn test:integration
  ```

+ ### Cobertura dos testes
  ```
  yarn test:coverage
  ```

---

## Decisão técnica:
Ao fazer alguns testes reparei que o tempo de processamento do crawler não está satisfatório, então decidi criar a branch [cached-crawler](https://github.com/LeonardoHabitzreuter/smart-crawler/tree/cached-crawler). Nesta branch existe uma schedule para rodar o crawler uma vez por dia, o resultado é mantido em cache no redis.