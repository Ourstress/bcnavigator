import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import useWeb3 from "../hooks/useWeb3";

function LatestTxns() {
  const latestBlock = useWeb3();
  return (
    <>
      <h3>Recent transactions</h3>
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
