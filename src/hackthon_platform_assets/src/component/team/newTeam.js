// 添加队伍
import React from "react";
import './team.css';


// 传入的参数包括项目简介，队伍名称，队长昵称，队长email,技术栈列表
class AddTeam extends React.Component{
    render() {
		return (
            <div className="add_team">
                <div className="project_intro">创建团队</div>
                <div className="add_icon"><img src={require("../../assets/add_icon.png").default} alt=""/></div>
            </div>
		);
	}
}

export default AddTeam;