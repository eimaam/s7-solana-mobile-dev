import { createContext, useContext, useState } from "react";
import {
  AuthorizeSessionResult,
  SignInPayload,
} from "@solana-mobile/mobile-wallet-adapter-protocol";

interface AuthorizationContextType {
  authorizeSession: (wallet: any) => Promise<Account>;
  authorizeSessionWithSignIn: (wallet: any, payload: SignInPayload) => Promise<Account>;
  deauthorizeSession: (wallet: any) => Promise<void>;
}

const AuthorizationContext = createContext<AuthorizationContextType | undefined>(undefined);

export const useAuthorization = () => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error("useAuthorization must be used within an AuthorizationProvider");
  }
  return context;
};

export const AuthorizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<Account | null>(null);

  const authorizeSession = async (wallet: any): Promise<Account> => {
    // Logic to authorize the session with the wallet
    const result: AuthorizeSessionResult = await wallet.authorize(); // Example method; adjust as necessary
    const accountInfo: Account = {
      address: result.address,
      // Include additional account properties as needed
    };
    setAccount(accountInfo);
    return accountInfo;
  };

  const authorizeSessionWithSignIn = async (wallet: any, payload: SignInPayload): Promise<Account> => {
    // Logic to authorize session with sign-in payload
    const result: AuthorizeSessionResult = await wallet.authorizeWithSignIn(payload); // Example method
    const accountInfo: Account = {
      address: result.address,
      // Include additional account properties as needed
    };
    setAccount(accountInfo);
    return accountInfo;
  };

  const deauthorizeSession = async (wallet: any): Promise<void> => {
    // Logic to deauthorize the session with the wallet
    await wallet.deauthorize(); // Example method; adjust as necessary
    setAccount(null);
  };

  return (
    <AuthorizationContext.Provider
      value={{
        authorizeSession,
        authorizeSessionWithSignIn,
        deauthorizeSession,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};
