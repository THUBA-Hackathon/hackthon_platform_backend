// 队伍的详情，已经结束黑客松
import React from "react";
import './team.css';
import Captain from "./captain";
import People from "./people";
import SubmitCodeDialog from "./dialogSubmitCode";


// 传入的参数包括队伍口号，队伍简介，队伍成员list，项目链接,队长信息
class TeamDetails extends React.Component{
    render() {
        let memberList = this.props.data.people_list.map((item, index) => {
            return (<People key={index} {...item} />)
        });
        return (
            <div className="team_details">
                <div className="team_declaration">{this.props.data.team_declaration}</div>
                <Captain team_name={this.props.data.team_name} cap_name={this.props.data.cap_name} email={this.props.data.email}/>
                <div className="divider">项目介绍</div>
                <div className="details_project_intro">{this.props.data.project_intro}</div>
                {/*<div className="details_project_link">{this.props.data.project_link}</div>*/}
                <div className="divider1">团队成员</div>
                {memberList}
                <SubmitCodeDialog />
            </div>
        );
    }
}

export default TeamDetails;
