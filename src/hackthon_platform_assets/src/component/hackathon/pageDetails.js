// 单个黑客松详细信息, 对应设计稿03页页面
import React from "react";
import './hackathon.css';
import HackathonDetails from "./hackathonDetails";
import Nav from "../nav";


// 传入的参数包括黑客松的海报图片url,赛事介绍详细内容words
class PageDetails extends React.Component{
    render() {
		return (
            <div>
                <Nav />
                <div className="details_line"></div>
                <img className="hackathon_poster_img" src="header_poster.png" alt=""/>
                <HackathonDetails url={this.props.url} intro={this.props.intro} startdate={this.props.startdate} enddate={this.props.enddate}/>
            </div>

		);
	}
}

export default PageDetails;
