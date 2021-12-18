import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import './index.css';
import App from './App';
// import { Principal } from '@dfinity/principal';
// import { hackthon_platform } from "../../declarations/hackthon_platform";
// import reportWebVitals from './reportWebVitals';
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom"
import PageDetails from './component/hackathon/pageDetails';
import TeamCard from './component/team/team';
import PageTeam from './component/team/pageTeam';
import AddTeam from './component/team/newTeam';
import Mine from './component/mine/mine';

let list = [
  {
      intro: "一个Web 3.0下的社区项目",
      team_name: 'NFit',
      cap_name: '马克',
      email: '2568198278@qq.com',
      techList: ["Rust", "Mokoto", "数据结构", "前端设计"],
  },
  {
      intro: "一个Web 3.0下的社区项目",
      team_name: 'NFit',
      cap_name: '马克',
      email: '2568198278@qq.com',
      techList: ["Rust", "Mokoto", "数据结构", "前端设计"],
  },
  {
      intro: "一个Web 3.0下的社区项目",
      team_name: 'NFit',
      cap_name: '马克',
      email: '2568198278@qq.com',
      techList: ["Rust", "Mokoto", "数据结构", "前端设计"],
  },
]

var intro = `赛事介绍 2021中国数据内容大赛是balabala \r\n 赛事介绍 2021中国数据内容大赛是本周完成事项+输出：\n
完成CP-ABE在mac系统的支持和实现\n
完成CP-ABE命令行工具实现\n
下周工作计划\n
完成CP-ABE在windows系统的支持\n
完成demo中CP-ABE的版本更换\n
是否存在问题及需要的支持：\n
无`
const rootElement = document.getElementById("root");
render(
  <HashRouter>
    <Routes>
      <Route path={"" + "/"} element={<App />}/>
      <Route path={"" + "/details"} element={<PageDetails url={require("./assets/header_poster.png").default} words={intro} startdate="2021-12-01" enddate="2021-12-17" />}/>
      <Route path={"" + "/cap"} element={<PageTeam teamList={list}/>}></Route>
      <Route path={"" + "/add"} element={<AddTeam />}></Route>
      <Route path={"" + "/mine"} element={<Mine />}></Route>
    </Routes>
  </HashRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
