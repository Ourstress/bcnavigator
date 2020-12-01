import { render, screen } from "@testing-library/react";
import LatestTxns from "./latestTxns";

jest.mock("../hooks/useLatestInfo", () => {
  let mockLatestBlock = {
    number: 11367436,
    timestamp: 1606836020,
    totalDifficulty: "19092012723969962310432",
    transactions: [
      "0x7f50f84507339c242c2df0324b7f7feb26c90c5c0591855f74f8038017ce5b80",
      "0xe954a1fbf928f8e4d4f8ee18a3fe12f066d44e61c1d317897ea1a5071fd7598b",
      "0xcc1c5b232a442ef4de14eace29b9750169e626dc15a75f4b2b7f0c4dd0847d1a",
    ],
  };
  const MockMyComponent = () => {
    return [[mockLatestBlock], mockLatestBlock];
  };
  return MockMyComponent;
});

test("LatestTxns displays header on load", () => {
  const headerSubText = "Recent Blocks";
  const headerMainText = "Refreshed every 13s";
  render(<LatestTxns />);
  expect(screen.getAllByText(headerSubText)).toBeTruthy();
  expect(screen.getAllByText(headerMainText)).toBeTruthy();
});

test("LatestTxns displays recent blocks and latest transactions", () => {
  const blockNumber = "11367436";
  const transaction1 =
    "0x7f50f84507339c242c2df0324b7f7feb26c90c5c0591855f74f8038017ce5b80";
  render(<LatestTxns />);
  expect(screen.getAllByText(blockNumber)).toBeTruthy();
  expect(screen.getAllByText(transaction1)).toBeTruthy();
});
