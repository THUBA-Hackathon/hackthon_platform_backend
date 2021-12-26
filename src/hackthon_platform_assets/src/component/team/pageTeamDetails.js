// 队伍的详情
import React from "react";
import './team.css';
import TeamDetails from "./teamDetails";
import Nav from "../nav"
import SubmitCodeDialog from "./dialogSubmitCode";


// 传入的参数包括队伍口号，队伍简介，队伍成员list，项目链接,队长信息
class PageTeamDetails extends React.Component{
    render() {
        return (
            <div className="page_team_details">
                <Nav />
                <TeamDetails data={this.props.data}/>
                
            </div>
        );
    }
}

export default PageTeamDetails;
