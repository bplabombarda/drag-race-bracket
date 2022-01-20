# Fantasy Drag Race


## Local Development

### Environment Setup

This project uses [dotenv](https://github.com/motdotla/dotenv) to load its configuration into environment variables.

#### Update `.env` File

Obtain the corresponding values in [Firebase](https://console.firebase.google.com/project/fantasy-drag-race/settings/general/web:NGYxY2ZlNGQtZmMwMy00Nzg0LThlZjYtMjE0Zjc2YTk4MTE0) for the existing environment variables and update the `.env` file with those values.

```
FIREBASE_API_KEY=[key]
FIREBASE_APP_ID=[app-id]
FIERBASE_DATABASE_URL=[url]
FIREBASE_PROJECT_ID=[proj-id]
```

### Install Dependencies

    npm install

### Run Webpack Development Server

This project uses Webpack as its module bundler. To run its development server:

    npm start
    
## Linting & Testing

### Run Linter

This project uses ESlint as its linter. To run:

    npm run lint

### Run Test Suite (TBD)

This project uses Jest as its test runner. To run:

    npm test


## Deploy

### Build For Production

    npm run build

### Deploy To Firebase

    npm run deploy:firebase    // runs `firebase deploy`

### The Whole Thing

    npm run deploy
