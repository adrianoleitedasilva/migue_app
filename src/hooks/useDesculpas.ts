import { useCallback, useRef, useState } from 'react';
import { DESCULPAS } from '../data/desculpas';
import type { Category, Desculpa, Level } from '../types';

interface UseDesculpasOptions {
  categoria: Category | null;
  nivel: Level | null;
}

export function useDesculpas({ categoria, nivel }: UseDesculpasOptions) {
  const [desculpa, setDesculpa] = useState<Desculpa | null>(null);
  const lastIdRef = useRef<number | null>(null);

  const gerarDesculpa = useCallback(() => {
    let pool = DESCULPAS;

    if (categoria) pool = pool.filter((d) => d.categoria === categoria);
    if (nivel) pool = pool.filter((d) => d.nivel === nivel);

    if (pool.length === 0) return null;

    // Avoid immediate repetition
    const available =
      pool.length > 1 ? pool.filter((d) => d.id !== lastIdRef.current) : pool;

    const picked = available[Math.floor(Math.random() * available.length)];
    lastIdRef.current = picked.id;
    setDesculpa(picked);
    return picked;
  }, [categoria, nivel]);

  return { desculpa, gerarDesculpa };
}
