
# Description

The Swifty Companion App API interacts with the 42 API, fetching and processing student data for the application.

## Installation

```bash
npm install
```

## Add environment variable

In root

```bash
touch .env
```

## For School, create a tunnel with Ngrok

1. Connect to your account

```bash
ngrok config add-authtoken <TOKEN>
```

2. Start ngrok by running the following command

```bash
ngrok http http://localhost:3000
```

- Ngrok getting started - [ngrok](https://ngrok.com/docs/getting-started/)

## Modify .env swifty_app

Change API_URL with the address fowarding created by ngrok

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
