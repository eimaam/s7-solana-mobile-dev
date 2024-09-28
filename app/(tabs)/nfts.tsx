import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NFTsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Minted NFTs</Text>
      {/* Display NFTs (for now, placeholder text) */}
      <Text>No NFTs minted yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default NFTsScreen;
