# Fantasy Drag Race


## Local Development

### Environment Setup

This project uses [dotenv](https://github.com/motdotla/dotenv) to load its configuration into environment variables.

#### Update `.env` File

Obtain the corresponding values in Firebase for the existing environment variables and update the `.env` file with those values.

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
