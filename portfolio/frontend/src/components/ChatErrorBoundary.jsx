import { Component } from "react";

export default class ChatErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Chat UI error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="panel-card p-4 text-sm text-slate-300">
          Chat is temporarily unavailable. Refresh the page and try again.
        </div>
      );
    }

    return this.props.children;
  }
}
