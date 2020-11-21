import NavSection from "./components/Navbar";
import Container from "react-bootstrap/Container";
import LatestTxns from "./components/latestTxns";

function App() {
  return (
    <Container fluid>
      <NavSection />
      <LatestTxns />
    </Container>
  );
}

export default App;
