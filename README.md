[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/error-type.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/error-type)
[![Node](https://img.shields.io/node/v/error-type.svg?logo=node.js)](https://www.npmjs.com/package/error-type)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

Create custom error types.

# Features

- [Simple API](#api): `errorType('errorName')`
- Follows [best practices](#best-practices)
- Error properties can be [set on initialization](#custom-initialization-logic):
  `new CustomError('message', { exampleProp: true })`
- Polyfills
  [`error.cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
  on
  [older Node.js and browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause#browser_compatibility)
- Optional [custom initialization logic](#custom-initialization-logic)

# Examples

## Custom error types

```js
import errorType from 'error-type'

const UserError = errorType('UserError')
const SystemError = errorType('SystemError')

// Throwing with custom error types
try {
  throw new UserError('message')
} catch (error) {
  console.log(error.name) // 'UserError'
  console.log(error instanceof UserError) // true
}
```

## Error properties

```js
// Error properties can be set using the second argument
const userError = new UserError('message', { userId: 56 })
console.log(userError.userId) // 56
```

## Error cause

```js
// `error.cause` can be used even in older Node.js or browsers
try {
  doSomething()
} catch (cause) {
  throw new UserError('message', { cause })
}
```

## Custom initialization logic

<!-- eslint-disable promise/prefer-await-to-callbacks -->

```js
const DatabaseError = errorType('DatabaseError', (error, params) => {
  error.dbId = params.databaseId
})
const databaseError = new DatabaseError('message', { databaseId: 2 })
console.log(databaseError.dbId) // 2
console.log(databaseError.databaseId) // undefined
```

# Install

```bash
npm install error-type
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## errorType(errorName, onCreate?)

`errorName` `string`\
`onCreate` `(error, params) => void`\
_Return value_: `ErrorType`

### Custom initialization logic

`onCreate(error, params)` is optional and is called on
`new ErrorType('message', params)`.

By default, it sets any `params` as `error` properties. However, you can
override it with any custom logic to validate, normalize `params`, etc.

### Error type properties

Some error properties are the same for all instances of a given error type. In
other words, those are properties of the error type, not of specific instances.

Those can be set by using a separate object with each error type's properties.
They can be assigned using [`onCreate()`](#custom-initialization-logic):

<!-- eslint-disable fp/no-mutating-assign -->

```js
const ERROR_PROPS = {
  UserError: { isBug: false },
  DatabaseError: { isBug: false },
  CoreError: { isBug: true },
}

const onCreate = function (error, params) {
  Object.assign(error, params, ERROR_PROPS[error.name])
}

const UserError = errorType('UserError', onCreate)
const DatabaseError = errorType('DatabaseError', onCreate)
const CoreError = errorType('CoreError', onCreate)
```

Alternatively, the logic that catches/handles the error can retrieve those error
properties instead:

```js
const UserError = errorType('UserError')
const DatabaseError = errorType('DatabaseError')
const CoreError = errorType('CoreError')
```

```js
const ERROR_PROPS = {
  UserError: { isBug: false },
  DatabaseError: { isBug: false },
  CoreError: { isBug: true },
}

try {
  doSomething()
} catch (error) {
  const isBug =
    error instanceof Error && error.name in ERROR_PROPS
      ? ERROR_PROPS[error.name].isBug
      : true
}
```

# Best practices

## Constructor

A common pattern for custom error types is:

<!-- eslint-disable fp/no-class, fp/no-this, fp/no-mutation -->

```js
class CustomError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CustomError'
  }
}
```

However, this has several issues (which `error-type` handles):

- [`error.cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
  is not set
- Unlike native error types,
  [`error.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name)
  is:
  - Enumerable, although it should not. For example, `for (const key in error)`
    will iterate over `name`, which is unexpected.
  - Set on the error instance instead of its prototype. In Node.js, this
    sometimes results in the error name being printed as `Error [CustomError]`
    instead of `CustomError`.

## Polyfills

Some `Error` polyfills (such as
[`es-shims/error-cause`](https://github.com/es-shims/error-cause) prevent
extending from it. This library includes
[some logic](https://github.com/ehmicky/error-type/blob/4ac5e53dde8a89411a59f16775f91a36ab3662b2/src/main.js#L50)
to fix this.

# Related projects

- [`modern-errors`](https://github.com/ehmicky/modern-errors): Handle errors
  like it's 2022 🔮
- [`normalize-exception`](https://github.com/ehmicky/normalize-exception):
  Normalize exceptions/errors
- [`merge-error-cause`](https://github.com/ehmicky/merge-error-cause): Merge an
  error with its `cause`
- [`error-cause-polyfill`](https://github.com/ehmicky/error-cause-polyfill):
  Polyfill `error.cause`

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/error-type/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/error-type/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
