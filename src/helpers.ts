export const setItemToLocalStorage = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

export const getItemFromLocalStorage = (name: string) => {
  return localStorage.getItem(name);
};
