import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className= "container main">
        <HomePage/>
      </div>
    </div>
  );
}

export default App;
