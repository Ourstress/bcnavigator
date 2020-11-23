import { useContext, useState, useEffect } from "react";
import { Web3Context } from "./web3";

export default function useLatestInfo() {
  const [latestBlock, setLatestBlock] = useState({});
  const [recentBlocks, setRecentBlocks] = useState([]);
  const web3 = useContext(Web3Context);
  useEffect(() => {
    const getRecentBlocks = async function () {
      if (web3) {
        const latest = await web3.eth.getBlockNumber();
        const blockNumbers = Array.from(Array(10)).map((_, index) => {
          index++;
          return latest - index;
        });
        const blocks = [];
        const addToBlock = function (err, result) {
          if (err) console.log(err);
          blocks.push(result);
        };
        const batch = new web3.eth.BatchRequest();
        blockNumbers.forEach((blockNumber) => {
          batch.add(web3.eth.getBlock.request(blockNumber, addToBlock));
        });

        batch.execute();
        setRecentBlocks(blocks);
      } else {
        return [];
      }
    };

    const getLatestTxns = () =>
      web3
        ? web3.eth.getBlock("latest").then((block) => setLatestBlock(block))
        : {};
    getLatestTxns();
    getRecentBlocks();
    // setInterval to refresh latest block every 13s
    const interval = setInterval(() => {
      getLatestTxns();
    }, 13000);
    return () => clearInterval(interval);
  }, [web3]);
  console.log("latestBlock", latestBlock);
  return [recentBlocks, latestBlock];
}
