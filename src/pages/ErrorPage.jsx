import React from 'react'

class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
    static getDerivedStateFromError (error) {
        return {hasError: true}
    }
    render () {
        if (this.state.hasError) {
            return <h1>Oops, something went wrong...</h1>
        }
        return this.props.children
    }
}

export default ErrorPage
