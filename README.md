# hacktivpress
Simple blog App with basic REST API.

# REST API
List of routes:

|Route                      | HTTP      |Description                             |
|---------------------------|-----------|----------------------------------------|
|/                          |GET        |Get into login and register page        |
|/login                     |POST       |Login registered user                   |
|/register                  |POST       |Register a user                         |
|/article                   |GET        |Get all article                         |
|/article/{$payload}        |GET        |Get article by id                       |
|/article/post              |POST       |Post an article                         |
|/article/delete/${payload} |DELETE     |Delete an article by id                 |
|/article/edit/${payload.id}|PUT        |Edit an article by id                   |
|/article/by/${payload}     |GET        |Get article by filtered                 |

# Usage

With only npm:

```
npm install
npm start
npm run dev
```

Access the website via http://localhost:3000 or API via http://localhost:3000/api.
