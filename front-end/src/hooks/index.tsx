import React from "react";

import { AuthProvider } from "./Auth";
import { ToastProvider } from "./Toast";
import { Rooms } from "./Rooms";

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <Rooms>
      <ToastProvider>{children}</ToastProvider>
    </Rooms>
  </AuthProvider>
);

export default AppProvider;
