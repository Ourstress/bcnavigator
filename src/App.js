import NavSection from "./components/Navbar";
import useWeb3 from "./hooks/useWeb3";

function App() {
  useWeb3();
  return (
    <main>
      <NavSection />
      <p>Hello world</p>
    </main>
  );
}

export default App;
