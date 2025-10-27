export function isBcryptHash(text: string): boolean {
  const bcryptRegex = /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/;
  return bcryptRegex.test(text);
}
