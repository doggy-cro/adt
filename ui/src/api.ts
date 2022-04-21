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
