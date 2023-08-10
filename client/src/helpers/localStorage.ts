type LocalStorageKeys = 'accessToken' | 'pokemons';

export class LocalStorage {
  static get = (key: LocalStorageKeys) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  static add = (key: LocalStorageKeys, value: object | string | null) =>
    localStorage.setItem(key, JSON.stringify(value));

  static remove = (key: LocalStorageKeys) => localStorage.removeItem(key);
}
