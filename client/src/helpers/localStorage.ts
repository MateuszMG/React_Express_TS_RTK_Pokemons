type LSKeys = 'accessToken';

export class LocalStorage {
  static get = (key: LSKeys) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  static add = (key: LSKeys, value: object | string | null) =>
    localStorage.setItem(key, JSON.stringify(value));

  static remove = (key: LSKeys) => localStorage.removeItem(key);
}
