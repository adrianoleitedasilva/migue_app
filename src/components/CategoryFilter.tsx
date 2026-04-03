import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  ALL_CATEGORIES,
  CATEGORY_EMOJIS,
  CATEGORY_LABELS,
} from '../constants/categories';
import { Colors } from '../constants/colors';
import type { Category } from '../types';

interface Props {
  selected: Category | null;
  onSelect: (cat: Category | null) => void;
}

export function CategoryFilter({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Chip
        label="Todas"
        emoji="✨"
        active={selected === null}
        color={Colors.primary}
        onPress={() => onSelect(null)}
      />
      {ALL_CATEGORIES.map((cat) => (
        <Chip
          key={cat}
          label={CATEGORY_LABELS[cat]}
          emoji={CATEGORY_EMOJIS[cat]}
          active={selected === cat}
          color={Colors.categoria[cat]}
          onPress={() => onSelect(selected === cat ? null : cat)}
        />
      ))}
    </ScrollView>
  );
}

function Chip({
  label,
  emoji,
  active,
  color,
  onPress,
}: {
  label: string;
  emoji: string;
  active: boolean;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.chip,
        { borderColor: color },
        active && { backgroundColor: color },
      ]}
    >
      <Text style={styles.chipText}>
        {emoji} {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  chipText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
});
