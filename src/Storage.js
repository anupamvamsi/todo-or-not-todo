export default class MyStorage {
  static storageAvailable(type) {
    let storage;

    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      console.log(e.code, e.name);
      return (
        e instanceof DOMException &&
        (e.name === 'QuotaExceededError' ||
          e.name === 'NS_ERROR_NOT_AVAILABLE' ||
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        storage &&
        storage.length !== 0
      );
    }
  }

  static checkStorageAvailable(type) {
    if (MyStorage.storageAvailable(type)) {
      // console.log(`storage type ${type} is available`);
      return true;
    } else {
      // console.log(`storage type ${type} is NOT available`);
      return false;
    }
  }
}
