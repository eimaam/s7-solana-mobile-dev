import { mintToCollectionV1 } from "@metaplex-foundation/mpl-bubblegum";
import { generateSigner, percentAmount, publicKey } from "@metaplex-foundation/umi";
import { createNft } from "@metaplex-foundation/mpl-token-metadata";
import { connectWallet } from './wallet';  // Wallet connection handler for mobile
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { umi } from "./umi";


async function mintCNFT() {
  // Connect wallet
  const leafOwner = publicKey("8hBosSCfzLy2fyoDU6UxfyALdj3vpPcW62s47Mth2ZSP"); // The owner of the cNFT


  // Pick image from gallery
  const imageResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (imageResult.cancelled) {
    console.log("No image selected");
    return;
  }
  
  const imageUri = imageResult.uri;

  // Get current location
  let location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;




  const metadata = {
    name: "eimaam - Solana NFT",
    symbol: "SSF2024",
    image: imageUri,
    seller_fee_basis_points: 500,
    "collection": { "key": "collectionMint", "verified": false },
    "attributes": [
        {
          "trait_type": "Website",
          "value": "https://eimaam.dev"
        }
    ],
    description: `An NFT created at latitude: ${latitude}, longitude: ${longitude}`,
    external_url: "https://eimaam.dev",
  };

  console.log("Uploading metadata...");
  const collectionMetadataUri = await umi.uploader.uploadJson(metadata);

  const merkleTreePublicKey = publicKey("3vA7mPJ4eUzLJM1XQZTv3zPezrHa5Kfv5V7rS6Htpdu2");
  const collectionId = generateSigner(umi);

  console.log("Metadata uploaded at:", collectionMetadataUri);

  console.log("Creating NFT collection...");
  await createNft(umi, {
    mint: collectionId,
    name: metadata.name,
    uri: collectionMetadataUri,
    sellerFeeBasisPoints: percentAmount(5.5), // 5.5% royalties
    isCollection: true,
  }).sendAndConfirm(umi);

  console.log("NFT collection created at:", collectionId.publicKey.toString());

  console.log("Minting cNFT...");

  const { signature } = await mintToCollectionV1(umi, {
    leafOwner,
    merkleTree: merkleTreePublicKey,
    collectionMint: collectionId.publicKey,
    metadata: {
      ...metadata,
      collection: {
        key: collectionId.publicKey,
        verified: false,
      },
      creators: [
        {
          address: umi.identity.publicKey,
          verified: true,
          share: 100,
        },
      ],
    },
  }).sendAndConfirm(umi, {
    send: {
      commitment: "finalized",
    },
  });

  console.log(`Minted cNFT with transaction: ${signature}`);
}

export default mintCNFT;
