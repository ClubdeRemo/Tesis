export const environment = {
  production: true,
  get apiUrl(): string {
    return (window as any)['env']?.apiUrl || 'http://localhost:3000';
  }
};

/* export const environment = {
    production: true,
    apiUrl: 'https://tesis-production-ec63.up.railway.app'
};   */