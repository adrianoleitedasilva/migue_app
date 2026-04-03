import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryFilter } from '@/components/CategoryFilter';
import { DesculpaCard } from '@/components/DesculpaCard';
import { LevelFilter } from '@/components/LevelFilter';
import { Colors } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import { useDesculpas } from '@/hooks/useDesculpas';
import type { Category, Level } from '@/types';

export default function GeradorScreen() {
  const [categoria, setCategoria] = useState<Category | null>(null);
  const [nivel, setNivel] = useState<Level | null>(null);

  const { desculpa, gerarDesculpa } = useDesculpas({ categoria, nivel });
  const { isFavorito, toggleFavorito, registrarHistorico } = useAppContext();

  const handleGerar = useCallback(async () => {
    const nova = gerarDesculpa();
    if (!nova) {
      Alert.alert('Ops!', 'Nenhuma desculpa encontrada para os filtros selecionados.');
      return;
    }
    await registrarHistorico(nova);
  }, [gerarDesculpa, registrarHistorico]);

  const handleCopiar = useCallback(async () => {
    if (!desculpa) return;
    await Clipboard.setStringAsync(desculpa.texto);
    Alert.alert('Copiado!', 'Desculpa copiada para a área de transferência.');
  }, [desculpa]);

  const handleCompartilhar = useCallback(async () => {
    if (!desculpa) return;
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      // Sharing text via a temp approach — works on iOS/Android
      await Clipboard.setStringAsync(desculpa.texto);
      Alert.alert('Compartilhar', `"${desculpa.texto}"\n\n(Texto copiado! Cole onde quiser 😄)`);
    } else {
      Alert.alert('Ops!', 'Compartilhamento não disponível neste dispositivo.');
    }
  }, [desculpa]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🤥</Text>
          <Text style={styles.title}>Migué App</Text>
          <Text style={styles.slogan}>faltou, mas com criatividade</Text>
        </View>

        {/* Filters */}
        <View style={styles.filtersBlock}>
          <Text style={styles.filterLabel}>Categoria</Text>
          <CategoryFilter selected={categoria} onSelect={setCategoria} />
          <Text style={[styles.filterLabel, { marginTop: 12 }]}>Nível</Text>
          <LevelFilter selected={nivel} onSelect={setNivel} />
        </View>

        {/* Card */}
        {desculpa ? (
          <DesculpaCard
            desculpa={desculpa}
            isFavorito={isFavorito(desculpa.id)}
            onFavorito={() => toggleFavorito(desculpa)}
            onCopiar={handleCopiar}
            onCompartilhar={handleCompartilhar}
          />
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🎲</Text>
            <Text style={styles.emptyText}>
              Toca no botão para gerar sua desculpa perfeita!
            </Text>
          </View>
        )}

        {/* Generate button */}
        <TouchableOpacity
          style={styles.generateBtn}
          onPress={handleGerar}
          activeOpacity={0.85}
        >
          <Text style={styles.generateBtnText}>
            {desculpa ? '🔄  Nova Desculpa' : '🎲  Gerar Desculpa'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    gap: 4,
  },
  logo: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  slogan: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  filtersBlock: {
    gap: 8,
  },
  filterLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 16,
  },
  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    marginHorizontal: 16,
    padding: 40,
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  generateBtn: {
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  generateBtnText: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
});
