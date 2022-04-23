import { routes } from './routes';

export const getSymbols = async (setter: any) => {
  const s: Array<string> = [];
  try {
    const res = await fetch(routes.getSymbols);
    const data = await res.json();
    Object.values(data).map((item: any) => {
      s.push(...item);
    });
    setter(s);
  } catch (error) {
    console.error("can't fetch symbols from server.");
    setter([]);
  }
};

export const saveChainData = async (data: any) => {
  const response = await fetch(routes.chainData, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  if (res.message) {
    return res.message;
  } else {
    return 'saved.';
  }
};

export const getChainData = async (id: any = null) => {
  let url;
  try {
    if (id) {
      url = `${routes.chainData}/${id}`;
    } else {
      url = routes.chainData;
    }
    const response = await fetch(url);
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("can't fetch chain-data from server.");
    return null;
  }
};
