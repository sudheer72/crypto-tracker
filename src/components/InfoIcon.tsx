import React from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoIconProps {
  tooltip: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ tooltip }) => {
  return (
    <div className="relative group inline-flex items-center ml-1">
      <HelpCircle className="h-4 w-4 text-gray-400" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
        {tooltip}
      </div>
    </div>
  );
};

export default InfoIcon;