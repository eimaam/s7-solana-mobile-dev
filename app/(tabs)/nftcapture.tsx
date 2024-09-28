import * as Location from 'expo-location';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NFTCaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [nftName, setNftName] = useState<string>('');
  const [mintAddress, setMintAddress] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const cameraRef = useRef<any>(null);

  // Request User's permission to access location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      }
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const toggleCamera = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const capture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
    }
  };

  // nft mint function 
  // TODO: move to utils file
  const mintNFT = async () => {
    if (imageUri && location && nftName && mintAddress) {
      const metadata = {
        imageUri,
        location: location.coords,
        nftName,
        mintAddress,
      };
      // Show modal with NFT details
      setShowModal(true);
      console.log('Minting NFT with metadata:', metadata);
    } else {
      console.log('Please complete all fields before minting.');
    }
  };

  const handleMintConfirmation = () => {
    // Logic to mint the NFT can go here
    setShowModal(false);
    // Reset the form if necessary
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <CameraView style={styles.camera} ref={cameraRef} type={facing} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCamera}>
            <Ionicons name="camera-reverse-outline" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={capture}>
            <Ionicons name="camera-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>

        {imageUri && (
          <>
            <View style={styles.previewContainer}>
              <Image source={{ uri: imageUri }} style={styles.preview} />
            </View>

            <TextInput
              style={styles.input}
              placeholder="NFT Name"
              placeholderTextColor="gray"
              value={nftName}
              onChangeText={setNftName}
            />

            <TextInput
              style={styles.input}
              placeholder="Mint Address"
              placeholderTextColor="gray"
              value={mintAddress}
              onChangeText={setMintAddress}
            />

            <Text style={styles.locationText}>
              Location: {location ? `${location.coords.latitude}, ${location.coords.longitude}` : 'Location not available'}
            </Text>

            <TouchableOpacity style={styles.mintButton} onPress={mintNFT}>
              <Text style={styles.text}>Mint NFT</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Modal for NFT Details */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>NFT Details</Text>
              <Text>NFT Name: {nftName}</Text>
              <Text>Mint Address: {mintAddress}</Text>
              <Image source={{ uri: imageUri }} style={styles.modalImage} />
              <TouchableOpacity style={styles.modalButton} onPress={handleMintConfirmation}>
                <Text style={styles.text}>Confirm Mint</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  preview: {
    width: 300,
    height: 300,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  locationText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  mintButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});
