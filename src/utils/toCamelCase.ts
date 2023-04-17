const toCamelCase = (str: string) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

export const objEntriesToCamelCase = (object: Record<string, any>) => {
    return Object.entries(object).reduce((acc, [key, value]) => {
    acc[toCamelCase(key)] = value;
    return acc;
  }, {})
}