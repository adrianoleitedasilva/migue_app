import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DesculpaListItem } from '@/components/DesculpaListItem';
import { Colors } from '@/constants/colors';
import { useAppContext } from '@/context/AppContext';

export default function FavoritosScreen() {
  const { favoritos, isFavorito, toggleFavorito } = useAppContext();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>❤️ Favoritos</Text>
        <Text style={styles.subtitle}>
          {favoritos.length === 0
            ? 'Nenhuma desculpa salva ainda'
            : `${favoritos.length} desculpa${favoritos.length > 1 ? 's' : ''} salva${favoritos.length > 1 ? 's' : ''}`}
        </Text>
      </View>

      {favoritos.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🫶</Text>
          <Text style={styles.emptyText}>
            Gere desculpas no Gerador e favorite as melhores!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => String(item.id)}
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
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
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
