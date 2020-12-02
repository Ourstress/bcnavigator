import useLatestInfo from "./useLatestInfo";
import { render } from "@testing-library/react";
import React from "react";
import { Web3Context } from "./web3";

const mockEth = {
  getBlock: (x) => Promise.resolve(x),
  getBlockNumber: jest.fn(),
  BatchRequest: jest.fn(),
};

console.log("mockEth", mockEth.getBlock());

const MockMyComponent = () => {
  const [recentBlocks, latestBlock] = useLatestInfo();
  return <p>Hello</p>;
};

const MockComponentWithProvider = () => (
  <Web3Context.Provider value={{ eth: mockEth }}>
    <MockMyComponent />
  </Web3Context.Provider>
);

test("useEffect called twice", () => {
  const mockUseEffect = jest.spyOn(React, "useEffect");
  render(<MockComponentWithProvider />);
  expect(mockUseEffect).toHaveBeenCalledTimes(2);
  mockUseEffect.mockRestore();
});

test("call to eth.getBlock()", () => {
  const mockEthSpy = jest.spyOn(mockEth, "getBlock");
  render(<MockComponentWithProvider />);
  expect(mockEthSpy).toHaveBeenCalledTimes(1);
  mockEthSpy.mockRestore();
});

test("useContext was called once", () => {
  const mockUseContext = jest.spyOn(React, "useContext");
  render(<MockComponentWithProvider />);
  expect(mockUseContext).toHaveBeenCalledTimes(1);
  mockUseContext.mockRestore();
});
