// 队长信息展示
import React from "react";
import './team.css';



// 传入的参数包括队伍名称，队长昵称，队长email
class Captain extends React.Component{
    render() {
		return (
            <div className="captain">
                {/*<Layout>*/}
                {/*    <Content>Content</Content>*/}
                {/*    <Footer>Footer</Footer>*/}
                {/*</Layout>*/}
                <div className="icon"><img src="cap_icon.png" alt=""/></div>
                <div className="team_name">{this.props.team_name}</div>
                <div className="cap_name">队长:{this.props.cap_name}</div>
                <div className="cap_email">Email:{this.props.email}</div>
            </div>
		);
	}
}

export default Captain;
