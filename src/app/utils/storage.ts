// Acceso seguro a sessionStorage: con SSR el codigo tambien corre en Node.js,
// donde no existen window ni sessionStorage.
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
}

export function getItem(key: string): string | null {
  return isBrowser() ? sessionStorage.getItem(key) : null;
}

export function setItem(key: string, value: string): void {
  if (isBrowser()) sessionStorage.setItem(key, value);
}

export function clearStorage(): void {
  if (isBrowser()) sessionStorage.clear();
}
