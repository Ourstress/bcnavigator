// import { useEffect } from "react";
import Web3 from "web3";
import { useState, useEffect } from "react";

export default function useWeb3() {
  const [latestBlock, setLatestBlock] = useState({});
  useEffect(() => {
    const rpcUrl = process.env.REACT_APP_ALCHEMYAPI_API_KEY;
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

    web3.eth.getBlock("latest").then((block) => setLatestBlock(block));
  }, []);
  console.log(latestBlock);
  return latestBlock;
}
