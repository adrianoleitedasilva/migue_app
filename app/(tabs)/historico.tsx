import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DesculpaListItem } from '@/components/DesculpaListItem';
import { Colors } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';

export default function HistoricoScreen() {
  const { historico, isFavorito, toggleFavorito, limparHistorico } =
    useAppContext();

  const handleLimpar = () => {
    if (historico.length === 0) return;
    Alert.alert(
      'Limpar histórico',
      'Tem certeza que quer apagar todo o histórico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: limparHistorico,
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>🕐 Histórico</Text>
          <Text style={styles.subtitle}>
            {historico.length === 0
              ? 'Nenhuma desculpa gerada ainda'
              : `${historico.length} desculpa${historico.length > 1 ? 's' : ''} gerada${historico.length > 1 ? 's' : ''}`}
          </Text>
        </View>
        {historico.length > 0 && (
          <TouchableOpacity onPress={handleLimpar} activeOpacity={0.7}>
            <Text style={styles.clearBtn}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {historico.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyText}>
            Seu histórico aparecerá aqui depois que você gerar desculpas!
          </Text>
        </View>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <DesculpaListItem
              desculpa={item}
              isFavorito={isFavorito(item.id)}
              onFavorito={() => toggleFavorito(item)}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 2,
  },
  clearBtn: {
    color: Colors.danger,
    fontSize: 15,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 40,
    paddingTop: 4,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 56,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
