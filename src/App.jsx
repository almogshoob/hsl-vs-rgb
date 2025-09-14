import "./App.css";
import { Console, Navbar } from "./components";
import { getRandomRGB } from "./utils/utils";

function App() {
  const target = getRandomRGB();

  return (
    <>
      <Navbar />
      <main className="content">
        <Console target={target} />
      </main>
    </>
  );
}

export default App;
