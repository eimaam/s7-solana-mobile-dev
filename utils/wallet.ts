import { MobileWalletAdapter } from '@solana-mobile/mobile-wallet-adapter-protocol';
import { PublicKey } from '@solana/web3.js';

// This will handle the mobile wallet connection
export const connectWallet = async () => {
  const adapter = new MobileWalletAdapter({
    supportsSignAndSendTransactions: true,
  });

  try {
    const accounts = await adapter.connect();
    const publicKey = new PublicKey(accounts[0].publicKey);

    console.log('Connected wallet:', publicKey.toString());
    return publicKey;
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    return null;
  }
};
