import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import useLatestInfo from "../hooks/useLatestInfo";

function LatestTxns() {
  const [recentBlocks, latestBlock] = useLatestInfo();
  return (
    <>
      <h3>Recent Blocks</h3>
      <p>Refreshed every 13s</p>
      <Container fluid className="card-columns">
        {recentBlocks &&
          recentBlocks.map((block, index) => (
            <Card style={{ width: "12rem" }} key={index}>
              <Card.Body>
                <Card.Text>{block.number}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </Container>
      <h3>Recent transactions</h3>
      <p>Refreshed every 13s</p>
      <Container fluid className="card-columns">
        {latestBlock &&
          latestBlock.transactions &&
          latestBlock.transactions.map((item, index) => (
            <Card style={{ width: "12rem" }} key={index}>
              <Card.Body>
                <Card.Text>{item}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </>
  );
}

export default LatestTxns;
