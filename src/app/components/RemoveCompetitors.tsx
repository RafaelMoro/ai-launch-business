import { getLocalStorageInfo } from "../utils/getLocalStorageInfo";
import { saveInfoToLocalStorage } from "../utils/saveInfoLocalStorage";

export default function RemoveCompetitors() {
  const handleClick = () => {
    const localStorageInfo = getLocalStorageInfo();
    const newLocalStorage = {
      ...localStorageInfo,
      competitors: [],
    };
    saveInfoToLocalStorage(newLocalStorage);
  }
  return (
    <button className="text-white" onClick={handleClick}>Remove competitors</button>
  )
}