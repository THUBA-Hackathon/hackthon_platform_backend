// 队伍信息展示卡片
import React from "react";
import './team.css';
import Captain from "./captain"
import TechStack from "./techstack"
import JoinTeamDialog from "./dialogJoinTeam";



// 传入的参数包括项目简介，队伍名称，队长昵称，队长email,技术栈列表
class TeamCard extends React.Component{
    render() {
		return (
            <div className="team_card">
                <div className="project_intro">{this.props.intro}</div>
                <Captain team_name={this.props.team_name} cap_name={this.props.cap_name} email={this.props.email}/>
                <TechStack techList={this.props.techList}/>
                <JoinTeamDialog />
            </div>
		);
	}
}

export default TeamCard;