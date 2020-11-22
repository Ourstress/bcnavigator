import NavSection from "./components/Navbar";
import Container from "react-bootstrap/Container";
import { Web3Provider } from "./hooks/web3";
import LatestTxns from "./components/latestTxns";

function App() {
  return (
    <Web3Provider>
      <Container fluid>
        <NavSection />
        <LatestTxns />
      </Container>
    </Web3Provider>
  );
}

export default App;
