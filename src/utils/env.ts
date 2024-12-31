export function loadEnv(key: string, defaultValue: string): string {
  if (import.meta.env[key]) {
    return import.meta.env[key];
  }
  
  if (typeof window !== 'undefined' && (window as any).ENV && (window as any).ENV[key]) {
    return (window as any).ENV[key];
  }
  
  return defaultValue;
}