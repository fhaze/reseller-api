English | [PortuguΓͺs](README.pt-BR.md)

# Reseller API

[![#](https://img.shields.io/badge/NodeJS-14.17.3-blue.svg)]()
[![#](https://img.shields.io/badge/Express-4.17.1-blueviolet.svg)]()
[![#](https://img.shields.io/badge/MariaDB-10.6.3-purple.svg)]()

API to register reseller, purchases and provide cashback  calculation and balance.

## π Requirements

This project was created using [NodeJS](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) as the package manager, you should have those tools installed before using this project.

- NodeJS
- Yarn
- Docker
- Docker-Compose

> π’ **Hey!** You can also use `npm` in case you don't have `yarn` installed.

## π Running the Project

Having the requirements installed and ready, you can continue with the following steps based on the desired package manager.

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

Done! the api should be running on http://localhost:8000

## βοΈ Running the Unit Tests

The unit tests are using the [mocha](https://mochajs.org/) library.


### yarn

```shell
yarn test
```

### npm

```shell
npm run test
```

## π« Postman

This [postman file](Reseller_API.postman_collection.json) was created to be used for local development, feel free to use it.

> π’ **Hey!** The authentication endpoint automatically injects the JWT token into the headers, for easy of use π».

## π Additional Rules

- It is not possible to register more than one reseller using the same `cpf`.
- It is not possible to register more than one purchase using the same `code`.
- The authenticated reseller can only view, edit and delete his/her own purchases.
- `cpf` and `email` are validated when registering a new reseller.
- You can only change `date` and `value` when updating a purchase.
