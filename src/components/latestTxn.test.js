import { render, screen } from "@testing-library/react";
import LatestTxns from "./latestTxns";

test("LatestTxns displays header on load", () => {
  jest.mock("../hooks/useLatestInfo", () => {
    let mockRecentBlocks = [];
    let mockLatestBlock = {};
    return {
      useLatestInfo: [mockRecentBlocks, mockLatestBlock],
    };
  });

  const headerSubText = "Recent Blocks";
  const headerMainText = "Refreshed every 13s";
  render(<LatestTxns />);
  expect(screen.getAllByText(headerSubText)).toBeTruthy();
  expect(screen.getAllByText(headerMainText)).toBeTruthy();
});
