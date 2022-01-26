// 队伍信息展示卡片
import React from "react";
import './team.css';
import Captain from "./captain"
import TechStack from "./techstack"
import JoinTeamDialog from "./dialogJoinTeam";
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
import { useNavigate } from "react-router-dom";


// 传入的参数包括项目简介，队伍名称，队长昵称，队长email,技术栈列表
export default function TeamCard(props){
    let navigate = useNavigate()
    const handleOnClick = (() => {
        navigate('/teamDetails')
    })
    return (
        <div className="team_card">
            <div className="project_intro_btn" onClick={handleOnClick}>{props.intro}</div>
            <Captain team_name={props.name} cap_name={props.members} />
            {/* email={this.props.email} */}
            <TechStack techList={props.skills_needed}/>
            {props.showJoin? <JoinTeamDialog />: ''}
        </div>
    );
}
