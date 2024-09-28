import React, { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

const WalletContext = createContext(null);

export const WalletProvider:FC<PropsWithChildren> = ({ children }) => {
    const [wallet, setWallet] = useState(null);
    const mobileWallet = useMobileWallet();

    const connectWallet = async () => {
        const connectedWallet = await mobileWallet.connect();
        setWallet(connectedWallet);
    };

    const disconnectWallet = async () => {
        await mobileWallet.disconnect();
        setWallet(null);
    };

    const value = {
        wallet,
        connectWallet,
        disconnectWallet,
    }

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};
