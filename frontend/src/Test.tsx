import { createWeb3Modal } from "@web3modal/wagmi/react";
import "./App.css";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { sepolia } from "wagmi/chains";
import { createConfig, WagmiProvider, useAccount, useDisconnect, useConfig, Connector } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { IExecDataProtector } from '@iexec/dataprotector';
import { bellecour } from "./config/walletChain";

const queryClient = new QueryClient();

const projectId = "7f8f794fd9ae06bd725aa1ffa82f1b99";

const metadata = {
  name: "wagmi-test",
  description: "Wagmi test",
  url: "https://google.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sepolia] as any;

const config = defaultWagmiConfig({
  projectId,
  metadata,
  chains,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
});

function Profile() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { connector } = useAccount() as { connector: Connector };

  async function secure() {
    try {
      
      const provider = await connector?.getProvider()
      const dataProtector = new IExecDataProtector(provider);

      const pResult = await dataProtector.protectData({
        data: {
          email: "example@gmail.com",
        },
        name: "email"
      })

      console.log(pResult)

    } catch (err: any) {
      console.log(err);
    }
  }

  if (isConnecting) return <h2>Connecting...</h2>;
  if (isDisconnected) return <h2>Account Disconnected</h2>;

  return (
    <div className="mt-5">
      <h2 className="text-lg font-bold">{address}</h2>
      <button
        onClick={secure}
        className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg"
      >
        Secure Data
      </button>
    </div>
  );
}

function Connection() {
  const { open, close } = useWeb3Modal();
  const config = useConfig();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={() => open()}
      >
        Open Connect Modal
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={() => open({ view: "Networks" })}
      >
        Open Network Modal
      </button>
      <button
        onClick={() => disconnect()}
        className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg"
      >
        Disconnect
      </button>
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <section className="pt-5">
          <div className="container">
            <h2 className="text-3xl mb-4">Wagmi Blockchain</h2>
          </div>
          <Connection />

          <Profile />
        </section>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
