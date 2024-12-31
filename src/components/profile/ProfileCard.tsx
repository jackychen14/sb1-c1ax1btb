import React from 'react';

interface ProfileCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  action?: string;
  onAction?: () => void;
}

export function ProfileCard({ icon, label, value, action, onAction }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
          </div>
        </div>
        {action && (
          <button 
            className="text-sm text-blue-500 font-medium hover:text-blue-600"
            onClick={onAction}
          >
            {action}
          </button>
        )}
      </div>
    </div>
  );
}