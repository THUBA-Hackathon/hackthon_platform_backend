// 队长信息展示
import React from "react";
import './team.css';
import TeamCard from "./team";
import AddProjectDialog from "./dialogAddProject";
import JoinTeamDialog from './dialogJoinTeam'


// 传入的参数包括若干个队伍的数据，分别包括项目简介，队伍名称，队长昵称，队长email,技术栈列表
class PageTeam extends React.Component{
    render() {
        var dataList = this.props.teamList.map((item, index) => {
            return (<div className="team_card_with_join_btn">
                        <TeamCard  key={index} intro={item.intro} name={item.name} members={item.members} skills_needed={item.skills_needed} showJoin={true} />
                    </div>)
        })
		return (
            <div className="page_team">
                {this.props.teamList.length > 0? dataList: ''}
                <AddProjectDialog hackathonId={this.props.hackathonId} userId={this.props.userid} setTeamList={this.props.setTeamList}/>
            </div>
		);
	}
}

export default PageTeam;
