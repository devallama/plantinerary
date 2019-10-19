# Developing Plantinerary - A Modern React SPA

## Introduction

The aim of the project is to develop a single page web application, using a modern JavaScript framework. The purpose of Plantinerary (plan-itinerary) is to display point of interest data on a web map, using open source libraries and mapping APIs. The data is sourced from [Autoura](https://www.autoura.com/), a service that provides vehicle based, in-destination travel experiences.

## Development

### JavaScript Framework

There are many JavaScript frameworks available to be used in web development, with three of the biggest being React.js, Vue.js and Angular. Each framework has it's own [benefits and drawbacks](https://medium.com/@TechMagic/reactjs-vs-angular5-vs-vue-js-what-to-choose-in-2018-b91e028fa91d) which TechMagic briefly outlines. Unfamiliar with Angular, despite the [benefits Angular brings with TypeScript](https://alligator.io/typescript/typescript-benefits/) with it's static typing, I was set on using either Vue.js or React.js for this project.

Vue.js is one of the more recently developed frameworks out of the three, which has [grown in significant popularity](https://michaelnthiessen.com/react-vs-vue-which-is-growing-faster/). It is very easy to learn with [extensive documentation](<https://vuejs.org/v2/guide/>), superior to [Reacts](https://reactjs.org/docs/hello-world.html). Vue.js uses [templates](https://vuejs.org/v2/guide/syntax.html) in developing the components, versus JSX used by React, which allows develops familiar with HTML to quickly transition into developing Vue components. Vue components have [Component-Scoped CSS](https://vue-loader.vuejs.org/guide/scoped-css.html), which allows styling to be applied only directly to components, therefore removing issues of conflicting CSS selectors and stylings. React does not provide this as core functionality, but third party libraries can be used to bring ["CSS-in-JS" functionality to React](https://reactjs.org/docs/faq-styling.html#what-is-css-in-js), allowing for similar results to Vues component-scoped CSS. An issue however with "CSS-in-JS" is it does not use CSS syntax, but instead "CSS-like" syntax in JS objects to style components, which while can have it's benefits such as conditional styling, it can be off-putting to developers as it steers away from the standard CSS syntax. Below shows the difference between styling components in React and Vue.js.

```jsx
import styled from 'styled-components';

const Text = styled.div`
  color: white,
  background: black
`;

<Text>Hello CSS-in-JS</Text>
```

*React CSS-in-JS example*

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">Hello</div>
</template>
```

*Vue.js Component-Scoped CSS example*

[React and Vue.js do share a range of similarities too](https://vuejs.org/v2/guide/comparison.html#React); both use a virtual DOM, they provide composable view components, and focus on the core functionality, with libraries adding extensive functionality, such as routing and global state.

The library I decided to pick out of the two was React; due to being a library I am more familiar with, and wanting to take the opportunity in this project to learn [React Router](https://reacttraining.com/react-router/) for handling app routing, a key functionality in a single page applications, and [React Redux](https://github.com/reduxjs/react-redux), a library that adds bindings for [Redux](https://redux.js.org/introduction/getting-started) which is a predictable state container used for JavaScript applications.

## Styling

Plantinerary uses [Bootstrap](https://getbootstrap.com/) as the foundation for the front-end, which provides a grid-system, prebuilt components, and extensive utilities for styling. Although allowing for in-depth responsive functionality, as it was not a requirement, the app has been built only for desktop devices.

On top of Bootstrap, the app uses [SASS/SCSS](https://sass-lang.com/) for custom styling, which implements numerous features and abilities that is missing from standard CSS. Some of these features include: partials (imports), which allow for styling to be separated into individual files and imported, variables to store either values or styling, and nested rules that reduces repetition by not needing to repeat selectors, and more which is detailed in the [SASS documentation](https://sass-lang.com/documentation/).

The custom styling is using the [BEM (Block Element Modifier) methodology](http://getbem.com/) to ensure that stylings for elements do not conflict, especially given Bootstrap is included which uses it's own naming convention for CSS selectors.

Bootstrap is imported into the app using [Bootstrap SCSS source files](https://getbootstrap.com/docs/4.0/getting-started/theming/) provided when installed via NPM. This allows for Bootstrap default styles to be easily overwritten, and customised variables and settings to be provided.

![Bootstrap imported into SCSS	](https://i.imgur.com/e8ONI7R.png)

*Bootstrap imported into SCSS*

## Workflow

### Source control & Remote repository

[Git](https://git-scm.com/) is being used for the source control for this project, primarily using Visual Studio Codes native source control tool that  makes it easier for tracking uncommitted files and to submit commits, while using the command line to push and pull requests and manage branches. Using Git ensures that if any issues arise with changes to the code, it can be reverted to a previous state, or compared to a previous state to find changes and issues. 

[GitHub](https://github.com/) is being used for the remote repository provider.

#### Git branching strategy

The branching strategy used for the project is based off of [Microsofts documented branching strategy for Azure devops](https://docs.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance?view=azure-devops). Branches that include new functionality or features are prefixed with 'feature/' and fixes are prefixed with 'fixes/'. As the only person working on this project, there is no need to consider protentional conflicts arising from multiple developers working on the same functionality, which could be resolved anyway by including a personal identifier to the prefix, such as initials.

![Git branches prefixed with feature/](https://i.imgur.com/44ethfu.png)

*Git branches prefixed with 'feature/'*

### Software & Tools

[Visual Studio Code](https://code.visualstudio.com/) is being used to develop the app, which includes a wide range of tools for testing and debugging web applications, an example being the [Chrome debugging tool](https://code.visualstudio.com/blogs/2016/02/23/introducing-chrome-debugger-for-vs-code). As part of the project I've created two snippets to speed up the creation of React and React Redux components.

```json
{
	"Empty react component redux": {
		"scope": "javascript,javascriptreact",
		"prefix": "emptyreactredux",
		"body": [
			"import React from 'react';",
			"import PropTypes from 'prop-types';",
			"import { connect } from 'react-redux';",
			"",
			"class $1 extends React.Component {",
			"\tconstructor(props) {",
			"\t\tsuper(props);",
			"\t}",
			"",
			"\trender() {",
			"\t\treturn (",
			"\t\t\t<div>",
			"\t\t\t\t$0",
			"\t\t\t</div>",
			"\t\t);",
			"\t}",
			"}",
			"",
			"$1.propTypes = {",
			"\t",
			"};",
			"",
			"const mapStateToProps = state => {",
			"\treturn ({",
			"\t\t",
			"\t});",
			"};",
			"",
			"export default connect(mapStateToProps, { })($1);"
		],
		"description": "Create empty react redux component template"
	}
}
```

*Empty react redux component snippet*

I'm also using the [React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [React Redux](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) Chrome extensions to help track state, props, and changes to the components and Redux store in real time.

### Module bundler

A module bundler is a tool that combines all files of a JavaScript web application and it's dependencies into a single (or multiple, depending how it's configured) JavaScript file. The bundler used in this project is one of the most well known, [Webpack](https://webpack.js.org/). While it primarily bundles JavaScript files, it can also import images and CSS pre-processor files, and export them as CSS files and static assets.

A feature of Webpack that is used in the project, is Aliases. By defining Aliases in the Webpack config, you can set key folders to an alias, making importing files much more simple. Below shows an example of Webpack aliases being used to resolve to the actions and components folders.

![Aliases](https://i.imgur.com/8sY7ujz.png)

### JavaScript transpiler

A [transpiler](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them) takes in the source code written in a programming language and produces the equivalent in a different language. JavaScript transpilers do the same, they take JavaScript like files (such as JSX and TypeScript files) and convert them into vanilla JavaScript. One of the uses of the transpiler for JavaScript, is for browser support. Due to lack of feature support in some browsers for new features, a transpiler can allow the developer to use modern JavaScript functionality and then transpile the code into JavaScript that is capable of running on a defined list of browsers. Another is to transpile web applications developed on a framework such as React, into JavaScript code the browser can understand and run.

Babel is used in the project for transpiling the React JSX files into vanilla JavaScript using the '*[@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)*' preset, while also targeting defined browser versions (IE  >= 10 and Chrome >= 50), to ensure that it will run on the most commonly used browsers. In the project I'm also using the '[@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)' plugin which allows for the use of the latest class properties functionality currently proposed to be added to JavaScript, the key feature being used here is arrow functions in class methods which remove the need to bind React component methods to '*this*'.

```jsx
class Example {
    openSearch = () => {
    	this.setState({
    		searchActive: true
        });
	}
}
```

*Class method using arrow functions*

### Task runner

To simplify the bundling and transpiling process, task runners are used to automate the work instead. [Gulp.js](https://gulpjs.com/) is the task runner used in this project which has a wide range of libraries that integrate key workflow tasks, such as transpiling, into the task runner.

Gulp has tasks to;

- Transpile SCSS to CSS using gulp-sass
- Transpile React and ES6 JS into ES5 JS
- Run a local server that automatically refreshes the page on changes to files, using a library called [browersync](https://www.browsersync.io/) and a gulp [watch task](https://gulpjs.com/docs/en/getting-started/watching-files)

## Basic wireframes

As the project was not design focused, only simple wireframes were created using Adobe XD to layout the pages of the application and figure out the flow.

![Wireframes](https://i.imgur.com/6DAB5vE.png)

![Wireframes](https://i.imgur.com/h3cXoK8.png)

![Wireframes](https://i.imgur.com/ZF3usbE.png)



## Routing

[React router](https://github.com/ReactTraining/react-router) [is a JavaScript routing library](https://medium.freecodecamp.org/beginner-s-guide-to-react-router-53094349669) built to extend React, introducing a simple API with powerful features, including dynamic routing and location transition handling, allowing the React UI to keep synchronised with the webpage URL and browser history.

All routes are defined within a <Router /> component which is created in the main 'App.jsx' file. The router for the app is using a [<Switch />](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Switch.md) component which stops the rending of multiple matching Routes by only rendering the first child Route or Redirect that matches the location. [<Route />](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md) components define the path to match to render the page view component to render, accepted in the 'component' prop. The project uses defined Page components, created in a separate folder called "Pages", that are the pages rendered to the Routes. The pages use a template Page component which includes a title prop, allowing the Route to define individual page titles.

Due to certain pages on the app requiring certain permissions (either to be logged in as a user, or not logged in as a user), I've created two special Routes that extends the base <Route /> component. <NouserRoute /> checks to see if the user is logged in, and if so, redirects them to a specified redirect page, or the dashboard by default. If the user is not logged in, the Route continues to render the specified component. The <ProtectedRoute /> route does the opposite, redirecting users who are not logged in, and allowing those who, are access to the page.

```jsx
<NouserRoute
    path="/register"
    component={PageRegister}
    title="Register"
    redirect="/dashboard"
/>
<ProtectedRoute
    path="/logout"
    component={PageLogout}
    title="Logout from Plantinerary"
    redirect="/"
/>
```

*Custom NouserRoute and ProtectedRoute*

Redirects and links are handled by components provided by react-router that will handle the navigation within the application. Both components only require a 'to' property, 'to' being the route to direct the user to.

```jsx
<Redirect to={this.props.redirect || "/"} />
<Link to="/login" className="mr-4"><button className="btn btn-primary">Login</button></Link>
```

*Redirect and link components*

## Using Redux

Single page applications can become difficult to manage with multiple components, sub components and so on, meaning it can become difficult to track and handle data, as explained in the [motivation behind Redux](https://redux.js.org/introduction/motivation). Redux helps to resolve that by providing functionality to store state globally that can be accessed anywhere from the app. [There are three core principles](https://redux.js.org/introduction/three-principles) behind Redux:

- There is a single source of truth - the state of the whole application is stored in a single object
- State is read only - State cannot be changed directly, instead actions have to be emitted to change state
- Changes are made with pure functions - Reducers simply return the next state to the component that emitted the action

Redux has actions and reducers. Actions are functions that modify the global Redux state, that can be emitted from anywhere within the application. Reducers simply pass the data in the required format to the state.

All core functionality in the Plantinerary app is handled by Redux actions. Actions include auth, which handles user authentication; trips, action that handles trips fetching, creating, and deleting; and the firebase action which initialises and stores the firebase instance.

```js
import { FIREBASE_FETCH_INSTANCE } from './types';

import firebase from 'firebase';
import firebaseConfig from '../firebase.confid';

firebase.initializeApp(firebaseConfig);

export const firebaseFetchInstance = () => dispatch => {
    dispatch({
        type: FIREBASE_FETCH_INSTANCE,
        data: {
            instance: firebase
        }
    });
};
```

*Firebase action*

The reducers for the actions are simple reducers that simply return the data with the relevant object key, as no ordering or pagination of the results is needed.

```js
import { FIREBASE_FETCH_INSTANCE } from 'Actions/types';

const initialState = {
    instance: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FIREBASE_FETCH_INSTANCE:
            return {
                ...state,
                instance: action.data.instance
            };
        default:
            return state;
    }
}
```

*Firebase reducer*

To access the Redux store, React components have to be set up a different way. Rather than exporting the component directly, instead a connect() method is exported, with parameters that include a method that maps the Redux state to the components props, the action method being emitted by the component, and the component reference.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authRegister } from 'Actions/auth-actions';
import Form from '../Form';
import FormInput from '../FormInput';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.fields = {
            name: {
                errorMessages: {
                    required: "Your name is required"
                }
            },
            email: {
                errorMessages: {
                    required: "Your email address is required",
                    format: "The email address given must be valid"
                }
            },
            password: {
                errorMessages: {
                    required: "A password is required",
                    lengthShort: "Your password must be more than 8 characters"
                }
            },
            confirmPassword: {
                errorMessages: {
                    required: "Please confirm your password",
                    match: "The password given does not match the one above"
                },
                customValidation: {
                    match: (field, fields) => field.value == fields.password.value
                }
            },
        }
    };

    render() {
        return (
            <Form fields={this.fields} className="form form--login col-md-4 offset-md-4" noValidate
                submitMethod={this.props.authRegister}>
                <h2>Register</h2>
                <FormInput label="Name" name="name" required />
                <FormInput label="Email Address" name="email" type="email" required />
                <FormInput label="Password" name="password" type="password" required minLength="8" />
                <FormInput label="Confirm Password" name="confirmPassword" type="password" required />
                <button className="btn btn-primary">Register</button>
            </Form>
        );
    }
}

RegisterForm.propTypes = {
    authRegister: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return ({
        auth: state.auth.response
    });
}

export default connect(mapStateToProps, { authRegister })(RegisterForm);
```

*React Redux component that registers a user*

## Mapping

The map used for the itinerary planner for Plantinerary uses [React Leaflet](https://react-leaflet.js.org/), which is built upon the open source library, [Leaflet](https://leafletjs.com/). It implements the functionality of Leaflet using React components, such as Popup, Marker and ToolTip. The map is used within the application to display itinerary items in the users planner on the currently selected date. Here they can focus to the point of interest and see more information about it on the map.

![Map](https://i.imgur.com/Pjf9F6c.png)

*Itinerary map*

The markers on the map will dynamically change when the user adds an itinerary item or changes the day they're looking at.

![Map pins](https://i.imgur.com/s8GQr74.gif)

The map uses [OpenStreetMap API](https://wiki.openstreetmap.org/wiki/API), a free, open source map provider, for the tiling for the map.

## User authentication

To allow the saving of individual trips and itinerary lists, the app implements a user authentication system using Firebase Auth. Traditional authentication systems can be fairly difficult to create and manage due to the security risks of handling and storing sensitive information such as email address, passwords, and personal data. But by using Firebase Auth, it does all of the hard work, while still giving you plenty of freedom.

[Firebase Auth](https://firebase.google.com/docs/auth/web/start) provides many providers to authenticate users including, email, Facebook, Twitter, and GitHub, while also being able to handle email address verification, password resets, email address changes and SMS verification features. Plantinerary currently only uses the '[email/password](<https://firebase.google.com/docs/auth/web/password-auth>)' provider, allowing users to signup and login securely to the application. Users can also login in anonymously which allows them to access features of the app without having to provide personal data (however, their saved trips and itineraries will be inaccessible when they log out). Firebase Auth does provide functionality to allow [anonymous users to convert to a permanent account](https://firebase.google.com/docs/auth/web/anonymous-auth#convert-an-anonymous-account-to-a-permanent-account), although this has yet to be implemented into the app.

The authentication methods have been created in a redux action name 'auth-actions'. This has methods that connect with the firebase instance to login, register, login anonymous, and logout user using actions.

```js
export const authLoginAnon = () => (dispatch, getState) => {
    const firebaseInstance = getState().firebase.instance;

    firebaseInstance.auth().signInAnonymously()
        .then(() => {
            dispatch({
                type: AUTH_LOGIN_ANON,
                response: {
                    status: 'auth/success',
                    message: 'Successfully logged in anonymously'
                }
            });
        })
        .catch(err => {
            dispatch({
                type: AUTH_LOGIN_ANON,
                data: {
                    response: {
                        status: err.code,
                        message: err.message
                    }
                }
            });
        });
}
```

*Auth action to login anonymous user*

## Firebase Firestore

Firebase Firestore is a flexible database that provides real-time listeners that automatically update data when they're changed in the database. This is especially powerful while used with React Redux, as it allows the data to be listened to anywhere within the application, using the Redux actions. Realtime listeners are used on fetching the trips data on the dashboard and planner page, as well as for fetching the itinerary items for each trip. This saves time by no longer needed to re-fetch data after making changes and the data will always be up to date with what's stored in the database.

```js
export const tripsFetch = () => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();
    const user = getState().user.user;

    db.collection("trips").where("uid", "==", user.uid)
        .onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });

            dispatch({
                type: TRIPS_FETCH,
                data: data
            });
        });
};
```

*Example method that fetches trips and listens for changes in real-time*

![Realtime deletion](https://i.imgur.com/bQ4eXOb.gif)

*Real-time update*

Another great feature of Firestore are sub collections. These are collections contained within a document, allowing that document to store documents itself, no longer needing to create multiple tables with references to each one document or entry like traditional SQL databases. The itineraries of the trips are sub collections as shown in this code snippet.

```js
export const itineraryItemCreate = (tripId, date, hour, event) => (dispatch, getState) => {
    const db = getState().firebase.instance.firestore();

    db.collection("trips").doc(tripId).collection("itinerary").add({
        date: date,
        hour: hour,
        event: event
    })
        .then(() => {
            dispatch({
                type: ITINERARY_ITEM_CREATE,
                data: {
                    response: 'itinerary/success'
                }
            });
        })
        .catch((err) => {
            dispatch({
                type: ITINERARY_ITEM_CREATE,
                data: {
                    response: err
                }
            });
        });
}
```



## Deployment to firebase

Deploying to [Firebase hosting](https://firebase.google.com/docs/hosting/quickstart?authuser=0) is done using their command line tools 'firebase-tools'. After logging into the tool and initialising the project, the app can be deployed using the 'firebase deploy' command which pushes the contents of the 'public' folder to Firebase to host.

Plantinerary is available at [https://plantinerary.firebaseapp.com](https://plantinerary.firebaseapp.com/).

## Where to find Plantinerary 

Live app: <https://plantinerary.com/>

GitHub repository: <https://github.com/devallama/plantinerary>
