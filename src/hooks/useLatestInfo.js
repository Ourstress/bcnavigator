import { useContext, useState, useEffect } from "react";
import { Web3Context } from "./web3";

export default function useLatestInfo() {
  const [latestBlock, setLatestBlock] = useState({});
  const web3 = useContext(Web3Context);
  useEffect(() => {
    const getLatestTxns = () =>
      web3
        ? web3.eth.getBlock("latest").then((block) => setLatestBlock(block))
        : {};
    getLatestTxns();

    // setInterval to refresh latest block every 13s
    const interval = setInterval(() => {
      getLatestTxns();
    }, 13000);
    return () => clearInterval(interval);
  }, [web3]);
  console.log("latestBlock", latestBlock);
  return latestBlock;
}
