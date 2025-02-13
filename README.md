<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Learning Api](https://documenter.getpostman.com/view/37298311/2sAYXCkJZm). A  <bold>Learning Management System</bold> that enables learners to track their topic completion, rank users based on subject completion rates, and allows teachers/admins to view learner rankings.
This is a technical task from People Culture


## Project setup

```bash
#Install all dependencies
$ npm install
```

## Create an .env file in the root directory and set the following environment variables:
DATABASE_URL=********
APP_ENV=DEVELOPMENT
POSTGRES_USER=************
POSTGRES_PASSWORD=***********
POSTGRES_DB=**************
JWT_ACCESS_SECRET=**********

## Compile and run the project without docker

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run with Docker

```bash
# docker build
$ docker-compose up --build -d


# check running containers
$ docker ps

# to stop the container
$ docker-compose down
```
## Documentation
Check full documentation here on [Postman](https://documenter.getpostman.com/view/37298311/2sAYXCkJZm)

## Approach Used

-Modular architecture: The app is structured into modules such as UsersModule, SubjectsModule, TopicsModule, and CompletionsModule to ensure separation of concerns.

-TypeORM: Used for interacting with PostgreSQL, with entities defining the schema and relationships.

-DTOs & Validation: DTOs (Data Transfer Objects) ensure type safety and validation when handling requests.

-Auto-generation of slugs: Unique slugs are created for subjects and topics to allow cleaner URLs and references. This aids user experience greatly.

-Authentication & Authorization: JWT is used for authentication, ensuring secure access to protected routes.

## Assumptions Made
-Users will have unique slugs and id(uuid): Each user has a unique slug for easier identification.

-User Type includes: Student (Default), Teacher and Admin.

-Subjects and topics are uniquely identified by slugs and id(uuid): The API assumes slugs instead of numeric IDs for routing.

-Completion tracking is tied to topics: Users' progress is stored based on topics they complete under each subject.

-Admin/Teachers can view rankings when they click on subjects. Students only view subjects and topics related only.


## Resources

Check out a few resources that may come in handy when working with NestJS:

- [NestJs](https://docs.nestjs.com/)
- [TypeOrm](https://typeorm.io/)
- [Postman](https://www.postman.com/)
- [Docker](https://www.docker.com/)

## Support

This **README.md** covers setup, API endpoints, approach, and assumptions. Let me know if you want anything adjusted! 🚀🔥
 [read more here](mujee.o.hammed@gmail.com).

## Stay in touch

- Author - [Mujeeb Hammed](https://https://x.com/HammedMujeeb2)
- Deployed Solution - [https://learning-api-c33p.onrender.com](https://learning-api-c33p.onrender.com)
- PostMan Documentation - [@Postman](https://documenter.getpostman.com/view/37298311/2sAYXCkJZm)

## License

This App is  [People Culture licensed](peopleandculture@hirenex.africa) @2025.
