import { createContext } from 'react';

export const TabBarContext = createContext<{
  setShowTabBar: (show: boolean) => void;
}>({
  setShowTabBar: () => {},
});
