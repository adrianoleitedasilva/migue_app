import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { Desculpa } from '../types';
import {
  addToHistorico,
  clearHistorico,
  getFavoritos,
  getHistorico,
  saveFavoritos,
} from '../utils/storage';

interface AppContextValue {
  favoritos: Desculpa[];
  historico: Desculpa[];
  isFavorito: (id: number) => boolean;
  toggleFavorito: (desculpa: Desculpa) => Promise<void>;
  registrarHistorico: (desculpa: Desculpa) => Promise<void>;
  limparHistorico: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favoritos, setFavoritos] = useState<Desculpa[]>([]);
  const [historico, setHistorico] = useState<Desculpa[]>([]);

  useEffect(() => {
    (async () => {
      const [favs, hist] = await Promise.all([getFavoritos(), getHistorico()]);
      setFavoritos(favs);
      setHistorico(hist);
    })();
  }, []);

  const isFavorito = useCallback(
    (id: number) => favoritos.some((d) => d.id === id),
    [favoritos],
  );

  const toggleFavorito = useCallback(
    async (desculpa: Desculpa) => {
      const updated = isFavorito(desculpa.id)
        ? favoritos.filter((d) => d.id !== desculpa.id)
        : [desculpa, ...favoritos];
      setFavoritos(updated);
      await saveFavoritos(updated);
    },
    [favoritos, isFavorito],
  );

  const registrarHistorico = useCallback(async (desculpa: Desculpa) => {
    const updated = await addToHistorico(desculpa);
    setHistorico(updated);
  }, []);

  const limparHistorico = useCallback(async () => {
    await clearHistorico();
    setHistorico([]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        favoritos,
        historico,
        isFavorito,
        toggleFavorito,
        registrarHistorico,
        limparHistorico,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
}
