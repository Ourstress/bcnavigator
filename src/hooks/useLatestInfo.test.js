import useLatestInfo from "./useLatestInfo";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { Web3Context } from "./web3";

const mockEth = {
  getBlock: (x) => Promise.resolve(x),
  getBlockNumber: jest.fn(),
  BatchRequest: class Batch {
    constructor() {
      this.add = jest.fn();
      this.execute = jest.fn();
    }
  },
};
mockEth.getBlock.request = jest.fn();

const MockMyComponent = () => {
  const [recentBlocks, latestBlock] = useLatestInfo();
  return <p>Hello</p>;
};

const MockComponentWithProvider = () => (
  <Web3Context.Provider value={{ eth: mockEth }}>
    <MockMyComponent />
  </Web3Context.Provider>
);

test("useEffect called twice", async () => {
  const mockUseEffect = jest.spyOn(React, "useEffect");
  render(<MockComponentWithProvider />);
  await waitFor(() => expect(mockUseEffect).toHaveBeenCalledTimes(2));
  mockUseEffect.mockRestore();
});

test("9 calls to eth.getBlock.request", async () => {
  const mockEthGetBlockRequest = (mockEth.getBlock.request = jest.fn());
  render(<MockComponentWithProvider />);
  await waitFor(() => expect(mockEthGetBlockRequest).toHaveBeenCalledTimes(9));
  mockEthGetBlockRequest.mockRestore();
});

test("useContext was called once", async () => {
  const mockUseContext = jest.spyOn(React, "useContext");
  render(<MockComponentWithProvider />);
  await waitFor(() => expect(mockUseContext).toHaveBeenCalledTimes(1));
  mockUseContext.mockRestore();
});
