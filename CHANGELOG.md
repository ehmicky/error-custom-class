# 3.0.0

## Breaking changes

- Error properties are now set by default using
  `new ErrorType('message', { props: { ... } })` instead of
  `new ErrorType('message', { ... })`

# 2.0.1

## Bug fixes

- Fix types

# 2.0.0

## Breaking changes

- Split `ErrorType` type into `ErrorConstructor` and `ErrorInstance`
- Add a template parameter `ErrorName` to all types

# 1.3.1

## Bug fixes

- Fix main function's return value's type

# 1.3.0

## Features

- Reduce npm package size

# 1.2.0

## Features

- Do not allow errors named 'Warning' or 'UnhandledPromiseRejection'
