import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ALL_LEVELS, LEVEL_EMOJIS, LEVEL_LABELS } from '../constants/categories';
import { Colors } from '../constants/colors';
import type { Level } from '../types';

interface Props {
  selected: Level | null;
  onSelect: (lvl: Level | null) => void;
}

export function LevelFilter({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Chip
        label="Todos"
        emoji="🎯"
        active={selected === null}
        color={Colors.primary}
        onPress={() => onSelect(null)}
      />
      {ALL_LEVELS.map((lvl) => (
        <Chip
          key={lvl}
          label={LEVEL_LABELS[lvl]}
          emoji={LEVEL_EMOJIS[lvl]}
          active={selected === lvl}
          color={Colors.nivel[lvl]}
          onPress={() => onSelect(selected === lvl ? null : lvl)}
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
