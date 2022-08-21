import errorType from 'error-type'

// Many tests operate on either `params` or `params.props`
export const PARAMS_OR_PROPS = [
  { key: 'params', getParams: (params) => params },
  { key: 'props', getParams: (props) => ({ props }) },
]

const onCreate = function (error, { props, ...params }) {
  error.props = props
  error.params = params
}

// Error class to test `params` and `params.props`
export const TestError = errorType('TestError', onCreate)
