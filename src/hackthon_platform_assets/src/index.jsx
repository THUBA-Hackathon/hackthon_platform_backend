import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route
} from "react-router-dom"
import PageDetails from './component/hackathon/hackathonDetails';
import TeamCard from './component/team/team';
import PageTeam from './component/team/pageTeam';
import AddTeam from './component/team/newTeam';
import Mine from './component/mine/mine';
import TeamDetails from "./component/team/teamDetails";
import MineTabs from './component/mine/mineTab';
import VerticalTabs from './component/mine/mineTab'
import PageTeamDetails from './component/team/pageTeamDetails';
import UserContext from "./context/user-context";
import { LoadingProvider } from "./component/Loading"
import { UserProvider } from "./context/user-context"
const rootElement = document.getElementById("root");

render(
  // <HashRouter>
  //   <Routes>
  //     <Route path={"" + "/"} element={<App />} />
  //     <Route path={"" + "/details/:id"} element={<PageDetails />} />
  //     <Route path={"" + "/cap"} element={<PageTeam teamList={list} />}></Route>
  //     <Route path={"" + "/add"} element={<AddTeam />}></Route>
  //     <Route path={"" + "/mine"} element={<Mine applyMessageList={list1} accountInfoData={data1} teamList={list2} />}></Route>
  //     {/* <Route path={"" + "/teamDetails"} element={<PageTeamDetails data = {teamDetail}/>}></Route> */}
  //   </Routes>
  // </HashRouter>,
  <HashRouter>
    <LoadingProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LoadingProvider>
  </HashRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
