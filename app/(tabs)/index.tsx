import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Solana Summer Fellowship 2024</Text>
        <Text style={styles.subHeaderText}>Solana Mobile Dev Session</Text>

        <Text style={styles.guidelinesHeader}>Welcome to the NFT Minting App!</Text>

        <Text style={styles.description}>
          This app allows you to mint NFTs with metadata, including an image, geolocation, and additional details like the NFT name and wallet address.
        </Text>

        <Text style={styles.guidelinesText}>
          Here's how the app works:
        </Text>

        <Text style={styles.pageDescription}>
          1. Welcome Screen: This screen provides an introduction to the app and how to navigate through the features.
        </Text>

        <Text style={styles.pageDescription}>
          2. NFT Capture Screen: Enter the wallet address to mint to, provide the NFT name, and capture an image. The app will also automatically retrieve your geolocation to include as metadata in your NFT. After filling in the details, you can mint your NFT.
        </Text>

        <Text style={styles.pageDescription}>
          3. NFT List Screen: View the NFTs that you have minted, with details of each NFT and their associated metadata.
        </Text>

        <Text style={styles.pageDescription}>
          Once you're ready, go ahead and capture your first NFT!
        </Text>

        <View style={styles.buttonContainer}>
        <Button title="Go to NFT Capture" onPress={() => router.push('/nftcapture')} />
        <Button title="Go to NFTs List" onPress={() => router.push('/nfts')} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  guidelinesHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  guidelinesText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  pageDescription: {
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
