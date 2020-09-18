# Greetings!

Dear Hiring Manager,

May I present my solution for the technical assessment. Do [reach out](#contact-me) if you would like to know more.

## Technology Stacks

Technologies used in this project:

|     |     |
| --- | --- |
| <a href="https://nodejs.org/en/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="100" alt="NodeJS" /></a> | [NodeJS](https://nodejs.org/en/) |
| <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="NestJS" /></a> | [NestJS](http://nestjs.com/)
| <a href="https://swagger.io" target="blank"><img src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" width="100" alt="Swagger" /></a> | [Swagger](https://swagger.io) |
| <a href="https://typeorm.io/" target="blank"><img src="https://avatars0.githubusercontent.com/u/20165699?s=200&v=4" width="100" alt="TypeORM" /></a> | [TypeORM](https://typeorm.io/) |
| <a href="https://www.mongodb.com" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width="100" alt="MongoDB" /></a> | [MongoDB](https://www.mongodb.com) |
| <a href="https://graphql.org" target="blank"><img src="https://cdn-media-1.freecodecamp.org/images/1*IvCDlfi3vQfgyKO1eFv4jA.png" width="100" alt="GraphQL" /></a> | [GraphQL](https://graphql.org) |
| <a href="https://angular.io" target="blank"><img src="https://miro.medium.com/max/480/1*VKY-Ldkt-iHobItql7G_5w.png" width="100" alt="Angular" /></a> | [Angular](https://angular.io) |
| | |

## Demo

[REST API Demo](https://cdn-freelancers.herokuapp.com/api/)

[GraphQL Demo](https://cdn-freelancers.herokuapp.com/graphql)

[Angular Client Demo](https://cdn-freelancers-client.herokuapp.com)
 

## API Usage (REST)

| HTTP Method | Route | Params | Request Body | Description | Response |
| ---         | ---   | ---    | ---          | ---         | ---      |
| `GET`         | /user/all  |        |              | Get all users | `200` OK |
| `GET`         | /user/{id}  | `id`:`string` |              | Fetch user by id | `200` OK <br/> `404` Record not found. |
| `PUT`         | /user/{id}  | `id`:`string` | [User DTO](#user-dto)             | Update user info by id | `204` Record updated. <br/> `404` Record not found. |
| `DELETE`      | /user/{id}  | `id`:`string` |              | Delete user by id | `204` Record deleted. <br/> `404` Record not found. |
| `POST`         | /user/  |        | [User DTO](#user-dto)             | Create new user | `201` The record has been successfully created. <br/> `400` Bad Request. |

### User DTO

```json
{
  "username": "string",
  "email": "string",
  "phone": "string",
  "skillsets": [
    "string"
  ],
  "hobby": [
    "string"
  ]
}
```

## API Usage (GraphQL)

### @Query users
Return all users

Example:

```graphql
{
  users {
    id
    username
    email
    phone
    skillsets
    hobby
  }
}
```

### @Query getUser(id: string)
Get user by id

Example:

```graphql
{
  getUser(id: "abc") {
    id
    username
    email
    phone
    skillsets
    hobby
  }
}
```

### @Mutation addUser(newUser: UserDto)
Create new user

Example:

```graphql
mutation {
  addUser(newUser: {
    username: "string",
    email: "string",
    phone: "string",
    skillsets: [
      "string"
    ],
    hobby: [
      "string"
    ]
  }){
    id
    username
    email
  }
}
```

### @Mutation updateUser(id: string, userData: UserDto)
Update user info by id

Example:

```graphql
mutation {
  updateUser(id: "string", userData: {
    username: "string",
    email: "string",
    phone: "string",
    skillsets: [
      "string"
    ],
    hobby: [
      "string"
    ]
  })
}
```


### @Mutation removeUser(id: string)
Delete user by id

Example:

```graphql
mutation {
  removeUser(id: "string")
}
```

## Installation

```bash
$ npm install
$ npm run build
```

## Running the app

```bash
# development
$ nest start

# watch mode
$ npm run start:dev

# production mode
$ npm run start
```

Go to [http://localhost:3000/api](http://localhost:3000/api) to launch Swagger

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Contact Me

- Author - [M. Hasbie](https://www.linkedin.com/in/mhasbie/)

