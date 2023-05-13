# 8.0.0

## Breaking changes

- Minimal supported Node.js version is now `16.17.0`

# 7.5.0

## Features

- Improve tree-shaking support

# 7.4.0

## Features

- Add browser support

# 7.3.1

## Bug fixes

- Fix `package.json`

# 7.3.0

- Switch to MIT license

# 7.2.0

## Features

- Improve TypeScript types

# 7.1.0

## Features

- Remove unused dependency

# 7.0.0

## Breaking changes

- Error `props` are not set anymore. Please use
  [`set-error-props`](https://github.com/ehmicky/set-error-props) instead.

# 6.1.0

## Features

- Error `props` are now deep merged

# 6.0.0

## Breaking changes

- The `onCreate` and `ParentClass` options have been removed. Please use
  [`error-class-utils`](https://github.com/ehmicky/error-class-utils) instead.

# 5.0.0

## Breaking changes

- The [`onCreate`](README.md#oncreate) and
  [`ParentClass`](README.md#parentclass) positional parameters are now named
  parameters inside an [options object](README.md#options).

# 4.1.0

## Feature

- Allow specifying the [parent error class](README.md#parent-class)

# 4.0.0

## Breaking changes

- The project was renamed from `error-type` to `error-custom-class`

# 3.0.0

## Breaking changes

- Error properties are now set by default using
  `new CustomError('message', { props: { ... } })` instead of
  `new CustomError('message', { ... })`

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
