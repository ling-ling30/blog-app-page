import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
};

export default LoadingOverlay;
