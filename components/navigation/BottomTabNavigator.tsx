import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/welcome';
import NFTCaptureScreen from '../../app/(tabs)/nftcapture';
import NFTsScreen from '../../app/(tabs)/nfts';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
      <Tab.Screen name="NFT Capture" component={NFTCaptureScreen} />
      <Tab.Screen name="NFTs" component={NFTsScreen} />
    </Tab.Navigator>
  );
}
