import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

const projectId = "7f8f794fd9ae06bd725aa1ffa82f1b99";
const queryClient = new QueryClient();

const metadata: any = {
  name: "educational blockchain",
  description: "Wagmi test",
  url: "https://google.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sepolia] as any;

const wagmiConfig = defaultWagmiConfig({
  projectId,
  metadata,
  chains,
});

createWeb3Modal({
  wagmiConfig,
  projectId,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  </React.StrictMode>
);
