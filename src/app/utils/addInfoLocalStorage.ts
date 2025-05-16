import { getLocalStorageInfo } from './getLocalStorageInfo';
import { saveInfoToLocalStorage } from './saveInfoLocalStorage';

export function addToLocalStorage({ newInfo, prop }: { newInfo: object, prop?: string }) {
  const localStorageInfo = getLocalStorageInfo();
  let newLocalStorage;
  if (prop) {
    newLocalStorage = {
      ...localStorageInfo,
      [prop]: newInfo,
    };
  } else {
    newLocalStorage = {
      ...localStorageInfo,
      ...newInfo,
    };
  }
  saveInfoToLocalStorage(newLocalStorage);
  return newLocalStorage;
}
