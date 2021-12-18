// 队伍的详情，已经结束黑客松
import React from "react";
import './team.css';
import Captain from "./captain";
import People from "./people";


// 传入的参数包括队伍口号，队伍简介，队伍成员list，项目链接,队长信息
class TeamDetails extends React.Component{
    render() {
        let memberList = this.props.people_list.map((item, index) => {
            return (<People key={index} {...item} />)
        });
		return (
            <div className="team_details">
                <div className="details_team_name">{this.props.team_name}</div>
                <Captain team_name={this.props.team_name} cap_name={this.props.cap_name} email={this.props.email}/>
                <div className="details_project_intro">{this.props.project_intro}</div>
                <div className="details_project_link">{this.props.project_link}</div>
                {memberList}
            </div>
		);
	}
}

export default TeamDetails;