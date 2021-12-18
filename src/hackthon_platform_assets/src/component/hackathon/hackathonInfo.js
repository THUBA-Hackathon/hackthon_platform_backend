// 单个黑客松简略信息,包括图片和文字
import React from "react";
import './hackathon.css';
import HackathonBrief from "./hackathonBrief";

// 传入的参数包括黑客松的图片url,名称name,主办方sponsor,开始日期startdate和结束日期enddate
class HackathonInfo extends React.Component{
    render() {
		return (
            <div className="hackathon_info">
                <div className="hackathon_img"><img src={this.props.url} alt=""/></div>
                <HackathonBrief name={this.props.name} sponsor={this.props.sponsor} startdate={this.props.startdate} enddate={this.props.enddate}/>
                <div className="hackathon_card_arrow"><img className="card_arrow_img" src={require("../../assets/arrow.svg").default} alt=""/></div>
            </div>
		);
	}
}

export default HackathonInfo;
