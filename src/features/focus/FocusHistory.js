import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';
import { spacing, fontSizes } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return (
    <Text
      style={
        Platform.OS === 'web'
          ? styles.historyItemWeb
          : styles.historyItem(item.status)
      }>
      {item.subject}
    </Text>
  );
};

export function FocusHistory({ focusHistory, onClear }) {
  const clearHistory = () => onClear();
  return (
    <>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Text style={styles.title}>Things foccused on</Text>
        <FlatList
          style={styles.flastList}
          contentContainerStyle={styles.listContentContainerStyle}
          renderItem={HistoryItem}
          data={focusHistory}
          keyExtractor={(item: object, index: number) => index}
        />
        <View style={styles.clearContainer}>
          <RoundedButton size={75} title="Clear" onPress={onClear} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    alignItems: 'center',
  },
  flastList: {
    width: '100%',
    height: '100%',
  },
  listContentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: spacing.sm,
  },
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),
  historyItemWeb: {
    color: 'white',
    fontSize: fontSizes.md,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    paddingBottom: spacing.md,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
