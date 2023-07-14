import { createContext, useState } from 'react';

export const AppContext = createContext();

const baseData = [
  {
    id: 100,
    owner: 'Owner 1',
    name: 'Alpha 1',
    latitude: 20.5937,
    longitude: 78.9629,
    selected: true,
  },

  {
    id: 1,
    owner: 'Owner 2',
    name: 'Alpha 2',
    latitude: -5.440049,
    longitude: 100,
    selected: false,
  },

  {
    id: 2,
    owner: 'Owner 3',
    name: 'Alpha 3',
    latitude: 50,
    longitude: 100,
    selected: false,
  },

  {
    id: 3,
    owner: 'Owner 4',
    name: 'Alpha 4',
    latitude: -50,
    longitude: 100,
    selected: false,
  },
];

const AppProvider = ({ children }) => {
  const [data, setData] = useState(baseData);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
