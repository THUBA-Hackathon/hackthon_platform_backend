import './App.css';
import Hackathon from './component/hackathon/hackathon'
import UserContext from "./context/user-context";
import React from "react";
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom"
import PageDetails from './component/hackathon/pageDetails';
import PageTeam from './component/team/pageTeam';
import AddTeam from './component/team/newTeam';
import Mine from './component/mine/mine';

const App = () => {
  const [user, setUser] = React.useState({
    principal: null,
    backendActor: null
  });
  const userValue = React.useMemo(
    () => ({ user, setUser }), [user, setUser]
  );
  return (
    <div className="App">
      {/* <UserContext.Provider value={userValue}> */}
      <UserContext.Provider value={userValue}>
        <HashRouter>
          <Routes>
            <Route path={"" + "/"} element={<Hackathon />} />
            <Route path={"" + "/details/:id"} element={<PageDetails />} />
            <Route path={"" + "/cap"} element={<PageTeam  />}></Route>
            <Route path={"" + "/add"} element={<AddTeam />}></Route>
            <Route path={"" + "/mine"} element={<Mine  />}></Route>
            {/* <Route path={"" + "/teamDetails"} element={<PageTeamDetails data = {teamDetail}/>}></Route> */}
          </Routes>
        </HashRouter>
      </UserContext.Provider>
      {/* </UserContext.Provider> */}
    </div>
  );
}

export default App;
