import { getChainData, delChainData, getCPaprikaPricesForTokens } from '../api';
import {
  addChainDataAll,
  addChainData,
  deleteChainData,
} from '../actions/chainActions';
import { addPriceDataAll } from '../actions/priceActions';

// Thunk functions
export function getChainDataFromServer(setter: any) {
  return async function getChainDataFromSrv(dispatch: any, getState: any) {
    const response = await getChainData();
    if (response.status === 503) {
      const data = await response.json();
      setter(data.message);
      setTimeout(() => {
        setter('');
      }, 3000);
      return;
    }
    dispatch(addChainDataAll(response));
  };
}

export function getPricesFromServer(setter: any, symbols: Array<string>) {
  return async function getPricesFromSrv(dispatch: any, getState: any) {
    const response = await getCPaprikaPricesForTokens(symbols);
    if (response.status === 503) {
      const data = await response.json();
      setter(data.message);
      setTimeout(() => {
        setter('');
      }, 3000);
      return;
    }
    dispatch(addPriceDataAll(response));
  };
}

export function getChainDataRecordFromServer(id: any, setter: any = null) {
  return async function getRecordFromServer(dispatch: any, getState: any) {
    const response = await getChainData(id);
    if (!response) {
      return;
    }
    dispatch(addChainData(response));
  };
}

export function deleteChainDataRecordFromServer(id: any, setter: any) {
  return async function deteleRecordFromServer(dispatch: any, getState: any) {
    const response = await delChainData(id);
    if (!response) {
      setter('server not available');
      setTimeout(() => {
        setter('');
      }, 3000);
      return;
    }
    setter(response);
    dispatch(deleteChainData(id));
  };
}
