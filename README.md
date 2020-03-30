# Smart Crawler!

Esta api é responsável por buscar informações no site da [Smart MEI](https://www.smartmei.com.br)

## Rodando a aplicação:

### *Em modo desenvolvimento*

+ **Instale as dependências**
  ```
  yarn
  ```

+ **Então rode o comando para subir a api e o redis**
  ```
  docker-compose up -d
  ```

  Ou, se preferir usar o yarn:
  ```
  docker-compose up -d db
  ```
  ```
  yarn dev
  ```
A aplicação rodará o playground na porta [3000](http://localhost:3000)

### *Em modo produção*

+ **Primeiro, suba o container do redis**
  ```
  docker-compose up -d db
  ```

+ **Então rode a api com o yarn**
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
  docker-compose up -d db
  ```
  ```
  yarn test:integration
  ```

+ ### Cobertura dos testes
  ```
  docker-compose up -d db
  ```
  ```
  yarn test:coverage
  ```

---

## Decisão técnica:
Lendo a documentação da [api de conversões de moedas](https://github.com/exchangeratesapi/exchangeratesapi#load-in-initial-data--scheduler) vi que a mesma não é atualizada a cada ocorrência de variação de moeda, e sim apenas uma vez por dia. Sendo assim utilizei um dataloader que armazena a resposta da api e limpa o cache apenas uma vez por dia.