import { type ReactNode, createContext, useContext, useState, useCallback } from 'react';

interface ModalContextValue {
  contactOpen: boolean;
  callbackOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  openCallback: () => void;
  closeCallback: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const openCallback = useCallback(() => setCallbackOpen(true), []);
  const closeCallback = useCallback(() => setCallbackOpen(false), []);

  return (
    <ModalContext.Provider
      value={{ contactOpen, callbackOpen, openContact, closeContact, openCallback, closeCallback }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
