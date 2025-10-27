export function objectToQueryParams(obj: Record<string, any>): string {
  const params = new URLSearchParams();

  Object.keys(obj).forEach(key => {
    params.append(key, obj[key]);
  });

  return "?" + params.toString();
}
