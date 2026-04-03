import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  CATEGORY_EMOJIS,
  CATEGORY_LABELS,
  LEVEL_EMOJIS,
} from '../constants/categories';
import { Colors } from '../constants/colors';
import type { Desculpa } from '../types';

interface Props {
  desculpa: Desculpa;
  isFavorito: boolean;
  onFavorito: () => void;
}

export function DesculpaListItem({ desculpa, isFavorito, onFavorito }: Props) {
  const catColor = Colors.categoria[desculpa.categoria];

  return (
    <View style={styles.item}>
      <View style={[styles.dot, { backgroundColor: catColor }]} />
      <View style={styles.content}>
        <Text style={styles.texto}>{desculpa.texto}</Text>
        <Text style={styles.meta}>
          {CATEGORY_EMOJIS[desculpa.categoria]} {CATEGORY_LABELS[desculpa.categoria]}
          {'  '}
          {LEVEL_EMOJIS[desculpa.nivel]}
        </Text>
      </View>
      <TouchableOpacity onPress={onFavorito} activeOpacity={0.7} hitSlop={8}>
        <Ionicons
          name={isFavorito ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorito ? Colors.danger : Colors.textMuted}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  texto: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
  meta: {
    color: Colors.textMuted,
    fontSize: 12,
  },
});
