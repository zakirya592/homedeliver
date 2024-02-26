// ToastContext.js
import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const showToast = (message, options) => {
  toast(message, options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};
