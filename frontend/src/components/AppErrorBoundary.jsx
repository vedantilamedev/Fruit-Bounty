import React from "react";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center px-6">
          <div className="max-w-xl w-full rounded-2xl border border-red-200 bg-white p-6 shadow-lg">
            <h1 className="text-2xl font-bold text-red-700 mb-2">Something went wrong</h1>
            <p className="text-sm text-slate-600 mb-4">
              App crash hua hai. Niche error message diya hai.
            </p>
            <pre className="text-xs bg-slate-100 p-3 rounded-lg overflow-auto text-slate-800">
              {this.state.error?.message || "Unknown error"}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
