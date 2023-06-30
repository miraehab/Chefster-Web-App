import "bootstrap/dist/css/bootstrap.min.css"
import Authentication from "./components/Authentication";
import GroupsPage from "./components/GroupsPage";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import RecipesPage from "./components/RecipesPage";
import UserProfile from "./components/UserProfile"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className= "container main">
        <UserProfile/>
      </div>
    </div>
  );
}

export default App;
