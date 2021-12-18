// 个人信息展示 用于队伍详情页的团队成员
import React from "react";
import './team.css';



// 传入的参数包括姓名，email
class People extends React.Component{
    render() {
		return (
            <div className="people">
                <div className="icon"><img src={require("../../assets/cap_icon.png").default} alt=""/></div>
                <div className="people_name">{this.props.people_name}</div>
                <div className="people_email">Email:{this.props.email}</div>
            </div>
		);
	}
}

export default People;