// 单个黑客松简略信息,只包括文字
import React from "react";
import './hackathon.css';

//传入的参数包括黑客松的名称name,主办方sponsor,开始日期startdate和结束日期enddate
class HackathonBrief extends React.Component{
    render() {
		return (
            <div>
                <div className="hackathon_name">{this.props.name}</div>
                <div className="hackathon_sponsor">主办方:{this.props.sponsor}<br />
                {this.props.startdate} - {this.props.enddate}</div>
            </div>
            
		);
	}
}

export default HackathonBrief;
