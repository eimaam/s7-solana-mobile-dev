import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Welcome' }} />
      <Tabs.Screen name="nftcapture" options={{ title: 'NFT Capture' }} />
      <Tabs.Screen name="nfts" options={{ title: 'NFTs' }} />
    </Tabs>
  );
}
