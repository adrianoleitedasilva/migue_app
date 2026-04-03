import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';
import { DESCULPAS } from '@/data/desculpas';

export default function ConfiguracoesScreen() {
  const { favoritos, historico, limparHistorico } = useAppContext();

  const handleLimparHistorico = () => {
    if (historico.length === 0) {
      Alert.alert('Histórico vazio', 'Não há nada para limpar.');
      return;
    }
    Alert.alert('Limpar histórico', 'Apagar todo o histórico?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Apagar', style: 'destructive', onPress: limparHistorico },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>⚙️ Configurações</Text>
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Estatísticas</Text>
        <View style={styles.statsRow}>
          <StatCard emoji="🎲" value={DESCULPAS.length} label="Desculpas" />
          <StatCard emoji="❤️" value={favoritos.length} label="Favoritas" />
          <StatCard emoji="🕐" value={historico.length} label="Histórico" />
        </View>
      </View>

      {/* Options */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Dados</Text>
        <View style={styles.card}>
          <SettingRow
            icon="trash-outline"
            iconColor={Colors.danger}
            label="Limpar histórico"
            onPress={handleLimparHistorico}
            destructive
          />
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>App</Text>
        <View style={styles.card}>
          <SettingRow
            icon="information-circle-outline"
            iconColor={Colors.primary}
            label="Sobre o Migué App"
            onPress={() => router.push('/sobre')}
          />
        </View>
      </View>

      {/* Version */}
      <Text style={styles.version}>Migué App v1.0.0</Text>
    </SafeAreaView>
  );
}

function StatCard({
  emoji,
  value,
  label,
}: {
  emoji: string;
  value: number;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SettingRow({
  icon,
  iconColor,
  label,
  onPress,
  destructive = false,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
  label: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconWrap, { backgroundColor: iconColor + '22' }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={[styles.rowLabel, destructive && { color: Colors.danger }]}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
  section: {
    marginTop: 24,
    gap: 10,
  },
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statEmoji: {
    fontSize: 22,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  version: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 'auto',
    paddingBottom: 24,
    paddingTop: 32,
  },
});
