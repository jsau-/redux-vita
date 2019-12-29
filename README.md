# redux-vita

**NOTE:** This library is currently under development. It should _not_ be used
in a production environment. At thist time breaking changes will frequently be
introduced.

This library is an experiment in trying to solve some of the issues with code
duplication and boilerplate found in bootstrapping simple Redux applications.

In a majority of cases, most of what we need to do is simply setting fields,
clearing fields, or performing simple operations on existing fields (eg.
increment this integer).

The goal is that by using `redux-vita` these simple operations should largely
become one-liners, and consumers should be able to register their own
functionality to extend the default API.

## Getting Started

```
# Install project dependencies
npm ci
```

## Core Concepts

### VitaEntity

In core Redux terms, `VitaEntity`s are analagous to reducers, and expose a
function which operates exactly like standard reducer functions.

By default a `VitaEntity` has a set of standard `Operation`s registered which
aim to provide a basic set of functionality sufficient for most simple apps.

#### Example Usage
```
// Instantiating a default VitaEntity
const vitaFoo = new VitaEntity('foo', { field: null });

// Registering the reducer for the VitaEntity
const store = createStore(vitaFoo.reduce);

// Dispatching a Vita DeltaObject
dispatch(vitaFoo.getDispatchableActionObjectForOperation('REMOVE_FIELD', 'field'));
```

### Operation

An operation encompasses a delta creator (a function which creates a raw object
describing the occurring change), and a delta handler (a function which
processes both the current state and an occurring delta object, and returns some
new state).

In core Redux terms, think of:
* Operation deltas like Action objects
* Operation handlers like sections in a Reducer which act on a given action
type.

## Contributing

While contributions are appreciated, they may be rejected if not in line with
the intended project direction. It's recommended to check before undertaking a
major piece of work and/or refactoring.