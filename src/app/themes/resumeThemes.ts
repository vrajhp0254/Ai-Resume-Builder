export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    title: string;
    heading: string;
    body: string;
  };
  spacing: {
    margin: number;
    lineHeight: number;
  };
}

export const themes: Record<string, ThemeConfig> = {
  modern: {
    id: 'modern',
    name: 'Modern Clean',
    colors: {
      primary: '#2563eb',
      secondary: '#1d4ed8',
      background: '#ffffff',
      text: '#111827'
    },
    fonts: {
      title: 'Helvetica',
      heading: 'Helvetica-Bold',
      body: 'Helvetica'
    },
    spacing: {
      margin: 20,
      lineHeight: 12
    }
  },
  professional: {
    id: 'professional',
    name: 'Professional Dark',
    colors: {
      primary: '#374151',
      secondary: '#1f2937',
      background: '#f9fafb',
      text: '#111827'
    },
    fonts: {
      title: 'Times-Roman',
      heading: 'Times-Bold',
      body: 'Times-Roman'
    },
    spacing: {
      margin: 25,
      lineHeight: 14
    }
  }
}; 