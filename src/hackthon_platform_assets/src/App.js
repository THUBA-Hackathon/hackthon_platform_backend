import './App.css';
import Hackathon from './component/hackathon/hackathon'
import UserContext from "./context/user-context";
import React from "react";


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
      <UserContext.Provider value={userValue}>
        <Hackathon />
      </UserContext.Provider>
    </div>
  );
}

export default App;
