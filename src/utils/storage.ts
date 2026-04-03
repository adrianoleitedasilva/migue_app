import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Desculpa } from '../types';

const KEYS = {
  FAVORITOS: '@migue:favoritos',
  HISTORICO: '@migue:historico',
} as const;

const HISTORICO_MAX = 50;

export async function getFavoritos(): Promise<Desculpa[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.FAVORITOS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveFavoritos(favoritos: Desculpa[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.FAVORITOS, JSON.stringify(favoritos));
}

export async function getHistorico(): Promise<Desculpa[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.HISTORICO);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveHistorico(historico: Desculpa[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.HISTORICO, JSON.stringify(historico));
}

export async function addToHistorico(desculpa: Desculpa): Promise<Desculpa[]> {
  const historico = await getHistorico();
  // Remove duplicates and prepend — keep max HISTORICO_MAX entries
  const filtered = historico.filter((d) => d.id !== desculpa.id);
  const updated = [desculpa, ...filtered].slice(0, HISTORICO_MAX);
  await saveHistorico(updated);
  return updated;
}

export async function clearHistorico(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.HISTORICO);
}
