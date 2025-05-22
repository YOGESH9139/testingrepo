// Configuration for Algorand API
export const algorandConfig = {
  network: process.env.NEXT_PUBLIC_ALGORAND_NETWORK || "testnet",
  algodToken: process.env.NEXT_PUBLIC_ALGOD_TOKEN || "",
  algodServer: process.env.NEXT_PUBLIC_ALGOD_SERVER || "https://testnet-api.algonode.cloud",
  algodPort: process.env.NEXT_PUBLIC_ALGOD_PORT || "",
  indexerToken: process.env.NEXT_PUBLIC_INDEXER_TOKEN || "",
  indexerServer: process.env.NEXT_PUBLIC_INDEXER_SERVER || "https://testnet-idx.algonode.cloud",
  indexerPort: process.env.NEXT_PUBLIC_INDEXER_PORT || "",
}
