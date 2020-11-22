import Web3 from "web3";
import React, { useEffect } from "react";
import { useState } from "react";

export const Web3Context = React.createContext();

export const Web3Provider = function ({ children }) {
  const [web3, setWeb3] = useState(false);

  useEffect(() => {
    const rpcUrl = process.env.REACT_APP_ALCHEMYAPI_API_KEY;
    setWeb3(new Web3(new Web3.providers.HttpProvider(rpcUrl)));
  }, []);
  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};
