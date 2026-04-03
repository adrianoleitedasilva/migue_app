import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  CATEGORY_EMOJIS,
  CATEGORY_LABELS,
  LEVEL_EMOJIS,
  LEVEL_LABELS,
} from '../constants/categories';
import { Colors } from '../constants/colors';
import type { Desculpa } from '../types';

interface Props {
  desculpa: Desculpa;
  isFavorito: boolean;
  onFavorito: () => void;
  onCopiar: () => void;
  onCompartilhar: () => void;
}

export function DesculpaCard({
  desculpa,
  isFavorito,
  onFavorito,
  onCopiar,
  onCompartilhar,
}: Props) {
  const catColor = Colors.categoria[desculpa.categoria];
  const lvlColor = Colors.nivel[desculpa.nivel];

  return (
    <View style={styles.card}>
      {/* Badges row */}
      <View style={styles.badges}>
        <View style={[styles.badge, { backgroundColor: catColor + '33', borderColor: catColor }]}>
          <Text style={styles.badgeText}>
            {CATEGORY_EMOJIS[desculpa.categoria]} {CATEGORY_LABELS[desculpa.categoria]}
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: lvlColor + '33', borderColor: lvlColor }]}>
          <Text style={styles.badgeText}>
            {LEVEL_EMOJIS[desculpa.nivel]} {LEVEL_LABELS[desculpa.nivel]}
          </Text>
        </View>
      </View>

      {/* Excuse text */}
      <Text style={styles.texto}>{desculpa.texto}</Text>

      {/* Action buttons */}
      <View style={styles.actions}>
        <ActionButton
          icon={isFavorito ? 'heart' : 'heart-outline'}
          color={isFavorito ? Colors.danger : Colors.textMuted}
          label={isFavorito ? 'Salvo' : 'Favoritar'}
          onPress={onFavorito}
        />
        <ActionButton
          icon="copy-outline"
          color={Colors.textMuted}
          label="Copiar"
          onPress={onCopiar}
        />
        <ActionButton
          icon="share-social-outline"
          color={Colors.textMuted}
          label="Compartilhar"
          onPress={onCompartilhar}
        />
      </View>
    </View>
  );
}

function ActionButton({
  icon,
  color,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={22} color={color} />
      <Text style={[styles.actionLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    gap: 20,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  texto: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 4,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});
