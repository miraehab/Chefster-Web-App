import GroupsPage from "./components/GroupsPage";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import RecipesPage from "./components/RecipesPage";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className= "container main">
        <GroupsPage/>
      </div>
    </div>
  );
}

export default App;
