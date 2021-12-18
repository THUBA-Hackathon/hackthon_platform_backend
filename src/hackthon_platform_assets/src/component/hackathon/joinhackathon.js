// 参加黑客松, 对应设计稿03页的我要参赛部分
import React from "react";
import './hackathon.css';


// 传入的参数包括黑客松的海报图片url,赛事介绍详细内容words
class HackathonDetails extends React.Component{
    render() {
		return (
            <div className="hackathon_details">
                <div className="hackathon_poster_img"><img src={this.props.url} alt=""/></div>
                <div className="hackathon_details_words">{this.props.words}</div>
            </div>
		);
	}
}

export default HackathonDetails;