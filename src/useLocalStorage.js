import { useEffect, useState } from "react";

export function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(function () {
    const storagevalue = localStorage.getItem(key);
    return storagevalue ? JSON.parse(storagevalue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
