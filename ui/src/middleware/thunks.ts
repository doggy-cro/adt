import { getChainData } from '../api';
import { addChainDataAll, addChainData } from '../actions/chainActions';

// Thunk functions
export async function getChainDataFromServer(dispatch: any, getState: any) {
  const response = await getChainData();
  dispatch(addChainDataAll(response));
}

export function getChainDataRecordFromServer(id: any) {
  return async function getRecordFromServer(dispatch: any, getState: any) {
    const response = await getChainData(id);
    if (!response) {
      return;
    }
    dispatch(addChainData(response));
  };
}
