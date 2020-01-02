# redux-vita

[![npm version](https://badge.fury.io/js/redux-vita.svg)](https://badge.fury.io/js/redux-vita)
[![Build Status](https://travis-ci.com/jsau-/redux-vita.svg?branch=master)](https://travis-ci.com/jsau-/redux-vita)

## Installing

`npm install redux-vita`

## Using the Library

Find basic snippets below - for full API documentation check out the
[documentation page](https://jsau-.github.io/redux-vita).

#### Instantiating `Vita`
```
import { Vita } from 'redux-vita';

// Default instantiation (with no default reducer state)
const vita = new Vita();

// Instantiating with default reducer state
const default_reducer_state = { field_one: 'default' };
const vitaWithDefaultState = new Vita(default_reducer_state);
```

#### Registering an Action Creator Function
You can register action creators on a `Vita`, allowing you to create a
dispatchable Redux action object by just passing the action's type at a later
time.

Additionally, when defining an action creator you can additionally pass a
second parameter, which is a function for generating additional properties on
the generated action object.

```
import { Vita, makeActionCreator } from 'redux-vita';

const vita = new Vita();

// Action creator which has no additional fields
const actionCreator = makeActionCreator('action_type');
vita.registerActionCreator('action_type', actionCreator);

// Action creator which accepts some params
const actionCreatorWithParams = makeActionCreator('action_wparams', (argone, argtwo) => ({ argone, argtwo }));
vita.registerActionCreator('action_params', actionCreatorWithParams);
```

#### Getting a Dispatchable Object for an Action Creator
Generate a Redux action object for a registered action type. Note that any
subsequent parameters after the type are provided as parameters to the property
generator function (if provided when registering the creator).

```
// Returns { type: 'action_type' }
const objectAction = vita.getDispatchable('action_type');

// Returns { argone: 1, argtwo: 2 }
const objectAction = vita.getDispatchable('action_wparams', 1, 2);
```

#### Registering a Reducer Function
You can register reducer functions to handle given action types. If no matching
handler is found on invoking `Vita::reduce` then the current state is
returned. If no current state is set, the default reducer state is returned.

```
vita.registerReducer('increment_counter', (state) => ({ ...state, counter: state.counter + 1 }));
```

#### Using the Reducer Within Redux
Instances of `Vita` expose a function `reduce`. This can be registered as
a reducer in Redux as you would a normal reducer function.

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
npm run lint
npm run test

// Build the library
npm run build:es2015
```

## Feedback and Support

For suggestions, issues, and/or support raise a GitHub issue!
