export const theme = {
  colors: {
    primary: '#3B82F6', // blue-500
    primaryContainer: '#DBEAFE', // blue-100
    onPrimary: '#FFFFFF',
    secondary: '#8B5CF6', // violet-500
    tertiary: '#F59E0B', // amber-500
    background: '#F8FAFC', // slate-50
    surface: '#FFFFFF',
    onSurface: '#1E293B', // slate-800
    onSurfaceVariant: '#64748B', // slate-500
    outline: '#CBD5E1', // slate-300
    warning: '#F59E0B', // amber-500
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal' as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: 'normal' as const,
      lineHeight: 20,
    },
  },
};

export type Theme = typeof theme;