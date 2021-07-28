English | [Português](README.pt-BR.md)

# Reseller API

[![#](https://img.shields.io/badge/NodeJS-14.17.3-blue.svg)]()
[![#](https://img.shields.io/badge/Express-4.17.1-blueviolet.svg)]()
[![#](https://img.shields.io/badge/MariaDB-10.6.3-purple.svg)]()

API to register reseller, purchases and provide cashback  calculation and balance.

## 🔌 Requirements

This project was created using [NodeJS](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) as the package manager, you should have those tools installed before using this project.

- NodeJS
- Yarn
- Docker
- Docker-Compose

> 📢 **Hey!** You can also use `npm` in case you don't have `yarn` installed.

## 🚀 Running the Project

Having the requirements installed and ready, you can continue with the following steps based the desired package manager.

### yarn

```shell
yarn
docker-compose up
db-migrate up
yarn start
```

### npm

```shell
npm install
docker-compose up
db-migrate up
npm start
```

Done! the api should be running on http://localhost:8000

## ⚗️ Running the Unit Tests

The unit tests are using the library [mocha](https://mochajs.org/).

```shell
yarn test
```

## 📫 Postman

This [postman file](Reseller_API.postman_collection.json) was created to be used for local development, feel free to use it.

> 📢 **Hey!** The authentication endpoint automatically injects the JWT token into the headers, for easy of use 🍻.

## 🛑 Additional Rules

- It is not possible to register more than one purchase using the same `code`.
- The authenticated reseller can only view, edit and delete his/her own purchases.
- `cpf` and `email` are validated when registering a new reseller.
- You can only change `date` and `value` when updating a purchase.
