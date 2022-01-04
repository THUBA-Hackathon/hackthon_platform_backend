// 个人信息展示 用于队伍详情页的团队成员
import React from "react";
import './team.css';



// 传入的参数包括姓名，email
class People extends React.Component{

    render() {
        console.log(this.props.people_name)
		return (
            <div className="people">
                <div className="icon1"><img src="cap_icon.png" alt=""/></div>
                <div className="people_name">姓名:{this.props.people_name}</div>
                <div className="people_email">Email:{this.props.email}</div>
            </div>
		);
	}
}

export default People;
