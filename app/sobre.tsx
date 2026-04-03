import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/colors';
import { DESCULPAS } from '@/data/desculpas';

const CATEGORIAS = [
  { emoji: '💼', label: 'Trabalho' },
  { emoji: '👨‍👩‍👧‍👦', label: 'Família' },
  { emoji: '🎉', label: 'Eventos Sociais' },
  { emoji: '📚', label: 'Escola/Faculdade' },
  { emoji: '💕', label: 'Relacionamentos' },
  { emoji: '🎲', label: 'Genéricas' },
];

export default function SobreScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Sobre</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🤥</Text>
          <Text style={styles.heroTitle}>Migué App</Text>
          <Text style={styles.heroSlogan}>faltou, mas com criatividade</Text>
        </View>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            O Migué App é o seu gerador oficial de desculpas criativas,
            engraçadas e absolutamente irresponsáveis. Ideal para fugir de
            eventos sociais, reuniões de trabalho, jantares de família e muito
            mais — sem culpa!
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Banco de dados</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{DESCULPAS.length}</Text>
              <Text style={styles.statLab}>Desculpas</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{CATEGORIAS.length}</Text>
              <Text style={styles.statLab}>Categorias</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>4</Text>
              <Text style={styles.statLab}>Níveis</Text>
            </View>
          </View>
        </View>

        {/* Categorias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias disponíveis</Text>
          <View style={styles.chipGrid}>
            {CATEGORIAS.map((c) => (
              <View key={c.label} style={styles.chip}>
                <Text style={styles.chipText}>{c.emoji} {c.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Níveis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Níveis de criatividade</Text>
          <View style={styles.levelList}>
            <LevelItem emoji="😊" nivel="Leve" desc="Para sair pela tangente com elegância" color={Colors.nivel.leve} />
            <LevelItem emoji="😂" nivel="Engraçada" desc="Aquela que faz rir mas funciona" color={Colors.nivel.engracada} />
            <LevelItem emoji="🤪" nivel="Absurda" desc="Para quem não tem mais nada a perder" color={Colors.nivel.absurda} />
            <LevelItem emoji="💀" nivel="Meme" desc="Direto ao ponto, sem cerimônia" color={Colors.nivel.meme} />
          </View>
        </View>

        <Text style={styles.footer}>
          Feito com 🤥 e criatividade{'\n'}Migué App v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function LevelItem({
  emoji,
  nivel,
  desc,
  color,
}: {
  emoji: string;
  nivel: string;
  desc: string;
  color: string;
}) {
  return (
    <View style={styles.levelItem}>
      <View style={[styles.levelDot, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.levelName}>{emoji} {nivel}</Text>
        <Text style={styles.levelDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  navTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  content: {
    paddingBottom: 48,
    gap: 24,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 16,
    gap: 6,
  },
  heroEmoji: {
    fontSize: 56,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
  },
  heroSlogan: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 18,
  },
  cardText: {
    color: Colors.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  section: {
    gap: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statNum: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
  },
  statLab: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '500',
  },
  levelList: {
    gap: 12,
  },
  levelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    gap: 14,
  },
  levelDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    flexShrink: 0,
  },
  levelName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  levelDesc: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  footer: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
});
