import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication";
import GroupsPage from "./components/GroupsPage";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import RecipesPage from "./components/RecipesPage";
import UserProfile from "./components/UserProfile"

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
      </>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Authentication path="signin"/>} />
        <Route path="/signup" element={<Authentication path="signup"/>} />
        <Route path="/recipes" element={<RecipesPage/>}/>
        <Route path="/groups" element={<GroupsPage/>}/>
        <Route path="/users" element={<UserProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
