import useLatestInfo from "../hooks/useLatestInfo";
import Table from "react-bootstrap/Table";

function LatestTxns() {
  const [recentBlocks, latestBlock] = useLatestInfo();
  return (
    <>
      <h3>Recent Blocks</h3>
      <p>Refreshed every 13s</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Block number</th>
          </tr>
        </thead>
        <tbody>
          {recentBlocks &&
            recentBlocks.map((block, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{block.number}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <h3>Recent transactions</h3>
      <p>Refreshed every 13s</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Block number</th>
          </tr>
        </thead>
        <tbody>
          {latestBlock &&
            latestBlock.transactions &&
            latestBlock.transactions.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default LatestTxns;
