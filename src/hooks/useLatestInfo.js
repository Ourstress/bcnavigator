import { useContext, useState, useEffect } from "react";
import { Web3Context } from "./web3";

export default function useLatestInfo() {
  const [latestBlock, setLatestBlock] = useState({});
  const [recentBlocks, setRecentBlocks] = useState([]);
  const web3 = useContext(Web3Context);
  useEffect(() => {
    const calcBlockNumbers = (latest) =>
      Array.from(Array(10)).map((_, index) => {
        index++;
        return latest - index;
      });

    const getRecentBlocks = async () => {
      if (web3) {
        const latest = await web3.eth.getBlockNumber();
        const blockNumbers = calcBlockNumbers(latest);
        const addToBlock = function (err, result) {
          if (err) console.log(err);
          setRecentBlocks((prevState) => [...prevState, result]);
        };
        const batch = new web3.eth.BatchRequest();
        blockNumbers.forEach((blockNumber) => {
          batch.add(web3.eth.getBlock.request(blockNumber, addToBlock));
        });

        batch.execute();
      } else {
        return [];
      }
    };
    getRecentBlocks();
  }, [web3]);

  useEffect(() => {
    const getLatestTxns = () =>
      web3
        ? web3.eth.getBlock("latest").then((block) => {
            setRecentBlocks((prevState) => prevState.slice(1).concat([block]));
            setLatestBlock(block);
          })
        : {};
    getLatestTxns();
    // setInterval to refresh latest block every 15s
    const interval = setInterval(() => {
      getLatestTxns();
    }, 13000);
    return () => clearInterval(interval);
  }, [web3]);
  console.log("latestBlock", latestBlock);
  return [recentBlocks, latestBlock];
}
