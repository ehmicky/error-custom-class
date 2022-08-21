import errorCustomClass from 'error-custom-class'

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
export const TestError = errorCustomClass('TestError', onCreate)
