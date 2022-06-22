# Plantinerary - Readme

## What is Plantinerary

Plantinerary is a itinerary planner for trips. Create an account or log in anonymous, create a trip and search and plan your future trips.

![Plantinerary planner](https://i.imgur.com/AmmHjb8.png)

## How to Install Locally

### Clone from Github

Clone the repository to your computer using `git clone https://github.com/devallama/plantinerary.git`

### Get Firebase project key

You will need [Firebase](https://firebase.google.com/) for this project. It is use for the database and to handle user authentication.

- Create a new project and go to the project overview.
- Add a new web app.
- Copy the contents of config only, do not copy any of the script elements.
- Create a file in the repository folder 'src/js/' called 'firebase.confid.js'.
- Add to the file 'export default {}'.
- Copy the contents of the config into the empty exported object.

Your firebase.confid.js should look something like this:

```js
export default {
    apiKey: "apikey",
    authDomain: "app.firebaseapp.com",
    databaseURL: "https://app.firebaseio.com",
    projectId: "appId",
    storageBucket: "app.appspot.com",
    messagingSenderId: "235235235"
}
```

### Get Autoura key

You will need an Autoura API key, you can get one [here](https://www.autoura.com/).

- Create a new file in 'src/js/' called 'AutouraKey.confid.js'.
- Once you have your key, set the contents of the AutouraKey file to `export default '[your Autoura key];'`.

### NPM Install

Install all NPM dependencies by running `npm install` in the command line.

### Gulp Tasks

Gulp is used for the task runner. There are four tasks:

- Compile CSS - `compile-css`
- Compile JavaScript - `compile-js`
- Build - `build`
- Serve - `serve` - starts a local browsersync server and watches for changes

You will need to have gulp-cli installed globally by running `npm install gulp-cli -g` from the command line.

### Firebase Auth

Firebase Auth is used in the project for user authentication so you will need to enable it in your project.

You will also need to enable the sign-in methods:

- Email/Password
- Anonymous

### Firebase Store

The app uses Firebase Firestore for storing data. You will need to set up the database, but otherwise, Firebase and the app will do the rest.

## Live demo

https://plantinerary.web.app/

## Documentation

Documentation as to my development thoughts and processes for this project can be found [here](https://github.com/devallama/plantinerary/blob/master/documentation.md).

## To Note

This project was part of a university assignment.
