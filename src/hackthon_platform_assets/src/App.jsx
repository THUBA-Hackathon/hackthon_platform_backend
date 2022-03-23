import './App.css';
import Hackathon from './component/hackathon/hackathon'
import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom"
import HackathonDetails from './component/hackathon/hackathonDetails';
import PageTeam from './component/team/pageTeam';
import Mine from './component/mine/mine';
import Nav from './component/Nav';
import TeamDetails from './component/team/teamDetails';
import Footer from "./component/Footer"
import { Loading } from "./component/Loading"
import { mainWidth } from './style';

const HackathonRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Hackathon />} />
      <Route path="/details/:id" element={<HackathonDetails />} />
      <Route path="/cap" element={<PageTeam />}></Route>
      {/* <Route path={"" + "/add"} element={<AddTeam />}></Route> */}
      <Route path="/mine" element={<Mine />}></Route>
      <Route path="/teamDetails/:hackathonID/:teamID" element={<TeamDetails />}></Route>
    </Routes>
  )
}

const App = () => {
  return (
    <div style={{ minWidth: mainWidth, paddingTop: 70 }}>
      <Nav />
      <HackathonRouters />
      <Footer />
      <Loading textColor="white" size={40} />
    </div>
  );
}

export default App;
