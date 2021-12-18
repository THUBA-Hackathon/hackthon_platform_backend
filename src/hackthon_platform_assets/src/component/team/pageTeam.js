// 队长信息展示
import React from "react";
import './team.css';
import TeamCard from "./team";
import AddProjectDialog from "./dialogAddProject";


// 传入的参数包括若干个队伍的数据，分别包括项目简介，队伍名称，队长昵称，队长email,技术栈列表
class PageTeam extends React.Component{
    render() {
        let dataList = this.props.teamList.map((item, index) => {
            return (<TeamCard key={index} {...item} />);
        })
		return (
            <div className="page_team">
                {dataList}
                <AddProjectDialog />
            </div>
		);
	}
}

export default PageTeam;