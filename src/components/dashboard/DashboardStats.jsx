import React from 'react';
// Import the equivalent icons from Gravity UI
import { 
  File, 
  Persons, 
  Thunderbolt, 
  CircleCheck, 
  Briefcase, 
  Eye, 
  Bookmark, 
  ChartLine 
} from '@gravity-ui/icons';

// Map string names to the Gravity UI React components
const iconMap = {
  file: File,
  users: Persons,
  zap: Thunderbolt,
  check: CircleCheck,
  briefcase: Briefcase,
  eye: Eye,
  bookmark: Bookmark,
  trending: ChartLine,
};

const StatCard = ({ title, value, iconName }) => {
  // Look up the icon from the dictionary, fallback to 'File' if not found
  const Icon = iconMap[iconName] || File; 

  return (
    // FIX: Removed w-full, added flex flex-col and h-full for fluid responsive behavior
    <div className="flex flex-col h-full bg-[#121213] border border-[#27272a] rounded-xl p-5 shadow-sm hover:border-[#3f3f46] transition-colors duration-200">
      
      {/* Changed to w-fit to ensure the icon background only wraps the icon perfectly */}
      <div className="bg-[#27272a] p-2.5 rounded-lg w-fit mb-6">
        <Icon className="text-gray-300" width={20} height={20} />
      </div>
      
      <div className="flex flex-col gap-1 mt-auto">
        <span className="text-[#a1a1aa] text-sm font-medium tracking-wide">
          {title}
        </span>
        <span className="text-white text-2xl font-semibold break-words">
          {value}
        </span>
      </div>
    </div>
  );
};

// This is the reusable wrapper you will import into other pages
export default function DashboardStats({ data = [] }) {
  if (!data || data.length === 0) return null;

  return (
    // The grid naturally handles the width of the child cards
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {data.map((stat, index) => (
        <StatCard 
          key={index} 
          title={stat.title} 
          value={stat.value} 
          iconName={stat.iconName} 
        />
      ))}
    </div>
  );
}