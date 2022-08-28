[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/error-custom-class.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/error-custom-class)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray&logoColor=0096ff)](/src/main.d.ts)
[![Node](https://img.shields.io/node/v/error-custom-class.svg?logo=node.js&logoColor=66cc33)](https://www.npmjs.com/package/error-custom-class)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

Create custom error classes.

# Features

- [Simple API](#api): `errorCustomClass('errorName')`
- Follows [best practices](#best-practices)
- Error properties can be [set on initialization](#error-properties):
  `new CustomError('message', { props: { example: true } })`
- Polyfills
  [`error.cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
  on
  [older Node.js and browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause#browser_compatibility)
- Optional [parent class](#parentclass) or
  [custom initialization logic](#oncreate)

# Example

```js
import errorCustomClass from 'error-custom-class'

const UserError = errorCustomClass('UserError')
const DatabaseError = errorCustomClass('DatabaseError')

try {
  throw new UserError('message')
} catch (error) {
  console.log(error.name) // 'UserError'
  console.log(error instanceof UserError) // true
}
```

# Install

```bash
npm install error-custom-class
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## errorCustomClass(errorName, options?)

`errorName` `string`\
`options` [`Options?`]()\
_Return value_: `CustomError`

Creates a custom error class.

### Options

Options are an optional object with the following members.

#### onCreate

_Type_: `(error, params) => void`

Called on `new CustomError('message', params)`.

```js
const DatabaseError = errorCustomClass('DatabaseError', {
  onCreate(error, { props }) {
    error.dbId = props.databaseId
  },
})
const databaseError = new DatabaseError('message', { props: { databaseId: 2 } })
console.log(databaseError.dbId) // 2
console.log(databaseError.databaseId) // undefined
```

##### Error properties

By default, `onCreate()` sets any `params.props` as `error` properties.

```js
const userError = new UserError('message', { props: { userId: 56 } })
console.log(userError.userId) // 56
```

#### ParentClass

_Type_: `typeof Error`\
_Default_: `Error`

Parent error class.

```js
const ParentError = errorCustomClass('ParentError')
const ChildError = errorCustomClass('ChildError', { ParentClass: ParentError })
const childError = new ChildError('message')
console.log(childError instanceof ChildError) // true
console.log(childError instanceof ParentError) // true
```

# Best practices

## Constructor

A common pattern for custom error classes is:

<!-- eslint-disable fp/no-class, fp/no-this, fp/no-mutation -->

```js
class CustomError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CustomError'
  }
}
```

However, this has several issues (which `error-custom-class` handles):

- [`error.cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
  is not set
- Unlike native error classes,
  [`error.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name)
  is:
  - Enumerable, although it should not. For example, `for (const key in error)`
    will iterate over `name`, which is unexpected.
  - Set on the error instance instead of its prototype. In Node.js, this
    sometimes results in the error name being printed as `Error [CustomError]`
    instead of `CustomError`.

## Polyfills

Some `Error` polyfills (such as
[`es-shims/error-cause`](https://github.com/es-shims/error-cause)) prevent
extending from it. This library includes
[some logic](https://github.com/ehmicky/error-custom-class/blob/4ac5e53dde8a89411a59f16775f91a36ab3662b2/src/main.js#L50)
to fix this.

# Related projects

- [`modern-errors`](https://github.com/ehmicky/modern-errors): Handle errors
  like it's 2022 🔮
- [`error-custom-classes`](https://github.com/ehmicky/error-custom-classes):
  Create multiple error classes
- [`error-serializer`](https://github.com/ehmicky/error-serializer): Convert
  errors to/from plain objects
- [`normalize-exception`](https://github.com/ehmicky/normalize-exception):
  Normalize exceptions/errors
- [`merge-error-cause`](https://github.com/ehmicky/merge-error-cause): Merge an
  error with its `cause`
- [`set-error-class`](https://github.com/ehmicky/set-error-class): Properly
  update an error's class
- [`set-error-message`](https://github.com/ehmicky/set-error-message): Properly
  update an error's message
- [`set-error-props`](https://github.com/ehmicky/set-error-props): Properly
  update an error's properties
- [`error-cause-polyfill`](https://github.com/ehmicky/error-cause-polyfill):
  Polyfill `error.cause`
- [`handle-cli-error`](https://github.com/ehmicky/handle-cli-error): 💣 Error
  handler for CLI applications 💥
- [`log-process-errors`](https://github.com/ehmicky/log-process-errors): Show
  some ❤ to Node.js process errors

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
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/error-custom-class/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/error-custom-class/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
