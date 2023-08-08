export const firstLetterToUpperCase = (text: string) =>
  text?.substring(0, 1).toUpperCase() + text?.substring(1);

export const separateStringOnSlashes = (text: string) =>
  firstLetterToUpperCase(text?.replace(/[A-Z]/g, (l) => ` ${l.toLowerCase()}`));

export const addPlural = (number: number) => (number > 1 ? 's' : '');

export const convertToSnakeCase = (text: string) =>
  text?.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);
