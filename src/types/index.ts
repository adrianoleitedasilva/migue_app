export type Category =
  | 'trabalho'
  | 'familia'
  | 'social'
  | 'escola'
  | 'relacionamento'
  | 'generica';

export type Level = 'leve' | 'engracada' | 'absurda' | 'meme';

export interface Desculpa {
  id: number;
  texto: string;
  categoria: Category;
  nivel: Level;
}
