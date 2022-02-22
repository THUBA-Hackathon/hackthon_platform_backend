// 首页黑客松进行阶段
import React from "react";
import './hackathon.css';

class Phase extends React.Component{    
    render() {
		return (
      <div className="phase">
          <div className="phase_on">进行中</div>
          {/* <div className="phase_upcoming">即将开始</div> */}
          <div className="phase_line"></div>
          <div className="phase_on_line"></div>
      </div>
    );
	}
}

export default Phase;