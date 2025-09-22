import React from 'react';
import { Loader2 } from '@/components/icons';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Carregando...', 
  fullScreen = true 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  const containerClasses = fullScreen 
    ? 'min-h-screen flex items-center justify-center bg-gray-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-4">
        <Loader2 
          className={`${sizeClasses[size]} animate-spin text-turnbold-green`}
          aria-label="Loading"
        />
        {message && (
          <p className="text-gray-600 text-sm animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;