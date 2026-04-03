import type { Category, Level } from '../types';

export const CATEGORY_LABELS: Record<Category, string> = {
  trabalho: 'Trabalho',
  familia: 'Família',
  social: 'Eventos Sociais',
  escola: 'Escola',
  relacionamento: 'Relacionamentos',
  generica: 'Genéricas',
};

export const CATEGORY_EMOJIS: Record<Category, string> = {
  trabalho: '💼',
  familia: '👨‍👩‍👧‍👦',
  social: '🎉',
  escola: '📚',
  relacionamento: '💕',
  generica: '🎲',
};

export const LEVEL_LABELS: Record<Level, string> = {
  leve: 'Leve',
  engracada: 'Engraçada',
  absurda: 'Absurda',
  meme: 'Meme',
};

export const LEVEL_EMOJIS: Record<Level, string> = {
  leve: '😊',
  engracada: '😂',
  absurda: '🤪',
  meme: '💀',
};

export const ALL_CATEGORIES: Category[] = [
  'trabalho',
  'familia',
  'social',
  'escola',
  'relacionamento',
  'generica',
];

export const ALL_LEVELS: Level[] = ['leve', 'engracada', 'absurda', 'meme'];
