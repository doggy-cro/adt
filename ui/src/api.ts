import { routes } from './routes';

export const getMetadata = async (setter: any) => {
  const s: Array<string> = [];
  try {
    const res = await fetch(routes.getFormData);
    const data = await res.json();
    const chains = data.chains;
    setter(chains);
  } catch (error) {
    console.error("can't fetch symbols from server.");
    setter({});
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
    if (response.status !== 200) {
      return response;
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("can't fetch chain-data from server.");
    return null;
  }
};

export const saveChainData = async (data: any) => {
  try {
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
  } catch (error) {
    console.error("can't fetch chain-data from server.");
    return "can't fetch chain-data from server.";
  }
};

export const delChainData = async (id: any) => {
  try {
    const response = await fetch(`${routes.chainData}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("can't fetch chain-data from server.");
    return null;
  }
};

export const getCPaprikaPricesForTokens = async (symbols: Array<string>) => {
  let url;
  try {
    url = `${routes.getPriceFromCPaprika}/?ticker=${symbols.join(',')}`;
    const response = await fetch(url);
    if (response.status !== 200) {
      return response;
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("can't fetch coinpaprika prices from server.");
    return null;
  }
};
