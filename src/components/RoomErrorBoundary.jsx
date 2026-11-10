import React from 'react';
import { AlertCircle, RotateCcw, RefreshCw } from 'lucide-react';

export default class RoomErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('RoomErrorBoundary caught an error in room:', this.props.roomName, error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('tashmi_sanctuary_v2');
      localStorage.removeItem('tashmi_sanctuary_v1');
    } catch (e) {
      console.warn('Failed to clear localStorage:', e);
    }
    window.location.reload();
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-12 px-4 max-w-lg mx-auto text-center">
          <div className="glass-panel p-8 rounded-3xl border border-rose-200/90 shadow-xl bg-white/95 text-stone-800">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-500 shadow-inner">
              <AlertCircle size={28} />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-stone-900 mb-2">
              A Little Kitten Bump in the Room
            </h3>
            <p className="text-stone-600 text-sm mb-4 leading-relaxed font-medium">
              Something gently tripped in this sanctuary room. Don't worry, your safe space is intact!
            </p>
            {this.state.error?.message && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 mb-6 text-xs text-rose-800 font-mono text-left overflow-x-auto shadow-inner">
                {this.state.error.message}
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleRetry}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-md transition cursor-pointer min-h-[42px]"
              >
                <RotateCcw size={14} />
                Try Room Again
              </button>
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 font-bold text-xs transition cursor-pointer min-h-[42px]"
              >
                <RefreshCw size={14} />
                Reset Sanctuary Data
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

