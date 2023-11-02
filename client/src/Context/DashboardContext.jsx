import React, { createContext, useState } from 'react';

export const DashboardContext = createContext();

export function DashboardContextProvider({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <DashboardContext.Provider
          value={{
            collapsed,
            setCollapsed,
          }}
        >
          {children}
        </DashboardContext.Provider>
      );

}
