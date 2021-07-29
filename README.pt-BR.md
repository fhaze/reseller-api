[English](README.md) | Português

# Revendedor API

[![#](https://img.shields.io/badge/NodeJS-14.17.3-blue.svg)]()
[![#](https://img.shields.io/badge/Express-4.17.1-blueviolet.svg)]()
[![#](https://img.shields.io/badge/MariaDB-10.6.3-purple.svg)]()

API de cadastro de revendedores, compras e cálculo de cashback.

## 🔌 Requirementos

Este projeto foi criado utilizando [NodeJS](https://nodejs.org/) e [Yarn](https://yarnpkg.com/) como gerenciador de dependência, sendo assim requeridos para o ambiente de desenvolvimento.

- NodeJS
- Yarn
- Docker
- Docker-Compose

> 📢 **Ei!** caso não tenha o `yarn` instalado, é possível também utilizar o `npm`. 

## 🚀 Executando o Projeto

Com os requisitos acima instalados, voce pode prosseguir com os seguintes comandos de acordo com seu gerenciador de dependência.

### yarn

```shell
yarn
docker-compose up -d
yarn migrate-up
yarn start
```

### npm

```shell
npm install
docker-compose up -d
npm run migrate-up
npm start
```

Caso tudo ocorra bem, a rest api estara executando em http://localhost:8000

## ⚗️ Executando Testes Unitários

Os Testes Unitários utilizam a lib [mocha](https://mochajs.org/).

yarn

```shell
yarn test
```

npm

```shell
npm run test
```

## 📫 Postman 

Para facilitar a interacao com a API foi criado um [arquivo postman](Reseller_API.postman_collection.json).

> 📢 **Ei!** A rota de autenticação automaticamente injeta o token JWT no header, facilitando o uso 🍻.

## 🛑 Regras adicionais

- Não é possível cadastrar mais de 1 compra com o mesmo `code`.
- O revendedor autenticado apenas pode ver, editar e remover suas proprias compras.
- `cpf` e `email` são validados no ato de cadastro do revendedor.
- A edição de compra apenas permite alterar os campos de `date` e `value`.
