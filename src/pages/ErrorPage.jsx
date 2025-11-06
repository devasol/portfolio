import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoiseBackground from '../components/home/NoiseBackground';
import BackgroundGrid from '../components/common/BackgroundGrid';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-dvh antialiased relative">
      <NoiseBackground />
      <BackgroundGrid />
      <div className="min-h-dvh flex flex-col items-center justify-center p-4 relative z-10">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-ink">
              Page Not Found
            </h2>
          </div>
          
          <p className="text-ink/80 mb-8 text-lg">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Go Back Home
            </button>
            
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] text-ink font-medium rounded-lg hover:bg-[color-mix(in_oklab,var(--color-ink),transparent_95%)] transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;