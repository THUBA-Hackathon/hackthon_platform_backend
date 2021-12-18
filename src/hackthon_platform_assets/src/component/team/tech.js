// 单个技术栈内容
import React from "react";
import './team.css';

class OneTech extends React.Component{
    render() {
		return (
            <div className="one_tech">
                {this.props.tech}
            </div>
		);
	}
}

export default OneTech;