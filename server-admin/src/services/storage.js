//sessionStorage operate
class sessionStorageProxy {
  constructor(storageModel) {
    this.storage = storageModel;
  }

  // 存
  setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  // 取
  getItem(key) {
    return JSON.parse(this.storage.getItem(key)) || null;
  }

  // 删
  removeItem(key) {
    this.storage.removeItem(key);
  }
}

//localStorage operate
class localStorageProxy extends sessionStorageProxy {
  constructor(localStorage) {
    super(localStorage);
  }
}

export const storageSession = new sessionStorageProxy(sessionStorage);

export const storageLocal = new localStorageProxy(localStorage);
