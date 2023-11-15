import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {hasError: false};

  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return {hasError: true};

  }

  componentDidCatch(error, errorInfo) {
  }

  render() {
    if (this.state.hasError) {
      return <div>程序异常报错</div>;
    }
    return this.props.children;
  }

}

export default ErrorBoundary;