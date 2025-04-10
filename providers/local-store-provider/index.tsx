import { createContext, FC, ReactNode, useEffect } from "react";

import { CookieSetting } from "@/features/cookie-banner";
import { useStateCallback } from "@/hooks/use-state-callback";

export interface LocalStore {
  cookieSettings?: CookieSetting;
}

/* eslint-disable no-unused-vars */
export interface LocalStoreContextData {
  set: (settings: Partial<LocalStore>) => void;
  store: LocalStore;
}

/* eslint-enable no-unused-vars */

const defaultSettings: LocalStoreContextData = {
  set: () => {},
  store: {
    cookieSettings: undefined,
  },
};

export const LocalStoreContext =
  createContext<LocalStoreContextData>(defaultSettings);

export interface LocalStoreProviderState {
  store: LocalStore;
}

export const LocalStoreProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const storeName = "digg-store";
  const [store, setStore] = useStateCallback(defaultSettings.store);

  const loadData = () => {
    if (!localStorage) return;

    const data = localStorage.getItem(storeName);
    if (!data) {
      setStore({ cookieSettings: {} });
      return;
    }

    const json = JSON.parse(data) as LocalStore;
    if (!json) return;

    setStore(json);
  };

  const set = (partialStore: Partial<LocalStore>) => {
    setStore({ ...store, ...partialStore }, (s: LocalStore) =>
      localStorage.setItem(storeName, JSON.stringify(s)),
    );
  };

  const data: LocalStoreContextData = {
    set,
    store,
  };

  /* eslint-disable */
  useEffect(() => {
    loadData();
  }, []);
  /* eslint-enable */

  return (
    <LocalStoreContext.Provider value={data}>
      {children}
    </LocalStoreContext.Provider>
  );
};
