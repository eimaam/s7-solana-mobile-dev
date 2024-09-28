import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { mintNft } from '@/utils';

export default function CaptureAndMintNFT() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const captureAndMint = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhotoUri(photo.uri);
      const imageUrl = await uploadToArweave(photo.uri);  // Upload the image
      await mintNft(imageUrl, location?.latitude, location?.longitude);  // Mint NFT
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {hasPermission ? (
        <Camera style={{ flex: 1 }} ref={ref => setCameraRef(ref)}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button title="Capture & Mint NFT" onPress={captureAndMint} />
          </View>
        </Camera>
      ) : (
        <Text>No access to camera or location.</Text>
      )}
    </View>
  );
}
