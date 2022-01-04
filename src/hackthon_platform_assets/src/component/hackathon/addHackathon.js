// 首页发起黑客松
import React from "react";
import './hackathon.css';

class AddHackathon extends React.Component{
    render() {
		return (
            <div className="addh">
                <div className="add_icon"><img src={require("../../../assets/add.png").default} alt=""/></div>
                <div className="add_font">发起黑客松</div>
            </div>
    );
	}
}

export default AddHackathon;