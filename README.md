# Avocados Pets API

This is the backend for the full stack pets app for the SEI-Avocados class.

## Planning section

2 parts associated with planning our API(the backend)
- ERD
- User Stories

#### User Stories

AAU I want to...
- Create pets
- See a list of all pets
- See a list of MY pets
- See a single pet
- update a pet
- delete a pet
- create toys
- give a toy to a pet
- update a toy
- delete a toy

## API

Use this as the basis for your own API documentation. Add a new third-level
heading for your custom entities, and follow the pattern provided for the
built-in user authentication documentation.

Scripts are included in [`curl-scripts`](curl-scripts) to test built-in actions. Feel free to use Postman for testing, using the curl scripts listed below and in the folder for setting up headers and request bodies.
Add your own scripts to test your custom API.

### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

### Pets

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/pets`             | `pets#index`    |
| GET   | `/pets/<pet_id>`    | `pets#show`    |
| POST   | `/pets`             | `pets#create`    |
| PATCH  | `/pets/<pet_id>` | `pets#update`  |
| DELETE | `/pets/<pet_id>`        | `pets#delete`   |

### Toys

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/pets/<pet_id>`             | `toys#create`    |
| PATCH  | `/pets/<pet_id>/<toy_id>` | `toys#update`  |
| DELETE | `/pets/<pet_id>/<toy_id>`        | `toys#delete`   |

#### Recommended Request bodies

Request - users#signup:

```json
{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
}
```

Request - pets#create (requires a token):

```json
{
    "pet": {
        "name": "Larry David",
        "type": "guinea pig",
        "age": 7,
        "adoptable": false
    }
}
```

### Token Auth Strategy

Send the token as `Bearer Token <token>`