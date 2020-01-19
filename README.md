# redux-vita

[![npm version](https://img.shields.io/npm/v/redux-vita.svg)](https://www.npmjs.com/package/redux-vita)
[![Build Status](https://travis-ci.com/jsau-/redux-vita.svg?branch=master)](https://travis-ci.com/jsau-/redux-vita)
[![npm downloads](https://img.shields.io/npm/dm/redux-vita.svg)](https://www.npmjs.com/package/redux-vita)

(Another) library aiming to reduce boilerplate in applications using Redux.

Note that this library does **_not_** aim to replace other fantastic
alternatives like [Redux Toolkit](https://redux-toolkit.js.org/). In the general
case Redux Toolkit will probably be a better fit for most apps.

The core concepts that the library aims for are:
* **Compatibility**. Ideally the library should be compatible with your existing
Redux flow out of the box. Do or don't use thunks, do or don't use middleware;
it's up to you.
* **Concise API**. Making an action creator, and a reducer for handling it
should be _short and simple_.
* **Modularity**. Use as much or as little of the library as you like. Want to
write your own action creator functions? Want to handle reducers yourself? You
can still do either.

Useful links:
* [Documentation](https://jsau-.github.io/redux-vita)
* [Code Coverage Report](https://jsau-.github.io/redux-vita/coverage/lcov-report)
* [Unit Test Report](https://jsau-.github.io/redux-vita/test_report.html)

# Contents
1. [Intro](#redux-vita)
2. [Installing](#installing)
3. [Examples](#examples)
    - [Create React App](#create-react-app)
    - [Create React App (Typescript)](#create-react-app-typescript)
    - [Class `Vita`](#class-vita)
    - [Registering a Slice](#registering-a-slice)
    - [Registering Action Creators](#registering-action-creators)
    - [Registering Reducers](#registering-reducers)
    - [Getting a Dispatchable Object](#getting-a-dispatchable-object)
    - [Registering the Reducer Function](#registering-the-reducer-function)
4. [Contributing](#contributing)
5. [Feedback and Support ](#feedback-and-support)

## Installing

`npm install redux-vita`

## Examples

#### Create React App

An example project using the library can be found in
`./examples/create-react-app`.

#### Create React App (Typescript)

An example project using the library can be found in
`./examples/create-react-app-typescript`.

#### Class `Vita`
The class `Vita` is basically a big wrapper around the core Redux concepts of
action creators and reducers.

On instantiating `Vita`, you can optionally provide some default state for the
reducer. Otherwise, we'll default to the empty object `{}`.

```
// No default state
const vita = new Vita();

// With default state
const vitaWithDefaultState = new Vita({ field_one: 'default' });
```

#### Registering a Slice

Most of the time you want to be able to dispatch an action, and handle it inside
a corresponding reducer. By calling `Vita.registerSlice` you can register both
the action creator and reducer functions at once.

Note that the action creator function is optional, and we'll handle making one
for you if not provided. This cuts down on boilerplate in cases where you don't
need a specific action creator with custom parameters - you just want to handle
an event.

```
// Without explicit action creator
vita.registerSlice(
  'action_type',
  (state) => ({ ...state, action_was_handled: true }),
);

// With explicit action creator
vita.registerSlice(
  'action_type_wparams',
  (state, action) => ({
    ...state,
    [action.field_to_increment]: state[action.field_to_increment] + 1,
  }),
  makeActionCreator(
    'action_type_wparams',
    (field_to_increment => ({ field_to_increment })),
  ),
);
```

#### Registering Action Creators

Action creators can be registered on their own, too.

As above, the function for generating the action is optional, so you only
provide one if you need to add custom properties to the created action objects.

This syntax also allows you to register thunks like you would've in a standard
app.

```
// Without explicit action creator
vita.registerAction('action_type');

// With explicit action creator
vita.registerAction('action_type_wparams', (param) => ({ param }));

// With thunk
vita.registerAction(
  'thunk',
  () => (dispatch) => { /* Implementation omitted... */ },
);
```

#### Registering Reducers

Reducers can be registered on their own too. This would make sense in a
context where you're subscribed to an event emitted from some other source in
the app.

```
vita.registerReducer(
  'increment_counter',
  (state) => ({ ...state, counter: state.counter + 1 }),
);
```

We've written some standard reducer functions that you might find useful in
your apps. [See the docs for a complete
list](https://jsau-.github.io/redux-vita). Using these functions is
completely optional - if they'll make your code less verbose, or less
error-prone then do!

Or, optionally, roll your own standard functions to fit
your use-case! This concept lends itself to factory functions which could
register all the action creators and reducers required to handle interacting
with an API, for example.

```
vita.registerReducer(
  'decrement_counter',
  (state) => reducerDecrementField(state, 'counter'),
);

vita.registerReducer(
  'increment_counter',
  (state) => reducerIncrementField(state, 'counter'),
);

vita.registerReducer(
  'clear_counter',
  (state) => reducerClearField(state, 'counter'),
);

vita.registerReducer(
  'maximise_counter',
  (state) => reducerSetField(state, 'counter', 999),
);

vita.registerReducer(
  'reset_form',
  (state) => reducerSetManyFields(
    state,
    { field_one: 'default_one', field_two: 'default_two' },
  ),
);

vita.registerReducer(
  'toggle_counter_enabled',
  (state) => reducerToggleBooleanField(state, 'counter_enabled'),
);
```

#### Getting a Dispatchable Object

If your registered creator accepts no params just call `Vita.action`; any
additional params are passed through to the creator function.

```
vita.registerAction('action_type');
vita.registerAction('action_type_wparams', (param) => ({ param }));

// Returns { type: 'action_type' };
const action = vita.action('action_type');

// Returns { type: 'action_type', param: 'foo' };
const action_wparams = vita.action('action_type_wparams', 'foo');

dispatch(action);
dispatch(action_wparams);
```

#### Registering the Reducer Function

Instances of `Vita` expose a function `reduce`. This method has the same
signature as a standard Redux reducer function, so you can just register it
the way you would in a traditional Redux app.

```
combineReducers({ my_reducer_name: vita.reduce });
```

## Contributing

While contributions are appreciated, they may be rejected if not in line with
the intended project direction. It's recommended to check before undertaking a
major piece of work and/or refactoring.

Contributions should be based off the `develop` branch, and any pull requests
made into `develop`.

Note that this project uses [TravisCI](https://travis-ci.org/) for continuous
integration. Any pull requests failing automated tests will be rejected.

#### Getting Started
```
// Install dependencies
npm ci

// Run tests
npm run check:types
npm run lint
npm run test

// Build the library
npm run build
```

## Feedback and Support

For suggestions, issues, and/or support raise a GitHub issue!
