import React from 'react';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

const themes: Theme[] = [
  {
    id: 'modern',
    name: 'Modern Clean',
    colors: {
      primary: '#2563eb',
      secondary: '#1d4ed8',
      background: '#ffffff',
      text: '#111827',
    },
  },
  {
    id: 'professional',
    name: 'Professional Dark',
    colors: {
      primary: '#374151',
      secondary: '#1f2937',
      background: '#f9fafb',
      text: '#111827',
    },
  },
  {
    id: 'creative',
    name: 'Creative Purple',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      background: '#ffffff',
      text: '#111827',
    },
  },
];

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeSelect: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <button
          type="button"
          key={theme.id}
          onClick={() => onThemeSelect(theme.id)}
          className={`p-4 border rounded-lg transition-all ${
            selectedTheme === theme.id
              ? 'border-blue-500 ring-2 ring-blue-500'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div 
            className="h-20 rounded-md mb-2"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <h3 className="font-medium text-gray-900">{theme.name}</h3>
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector; 