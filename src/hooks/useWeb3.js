// import { useEffect } from "react";
import Web3 from "web3";
import { useEffect } from "react";

export default function useWeb3() {
  useEffect(() => {
    const rpcUrl = process.env.REACT_APP_ALCHEMYAPI_API_KEY;
    console.log("rpcUrl", rpcUrl);
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

    web3.eth.getBlock("latest").then(console.log);
  });
}
