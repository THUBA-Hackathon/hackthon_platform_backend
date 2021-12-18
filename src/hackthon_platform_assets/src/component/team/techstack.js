// 技术栈
import React from "react";
import './team.css';
import OneTech from "./tech";


// 传入的参数包括技术栈列表techList
class TechStack extends React.Component{
    render() {
        let dataList = this.props.techList.map((item, index) => {
            return (<OneTech key={index} {...item} />);
        })
		return (
            <div className="tech_stack">
                所需技术栈:{dataList}
            </div>
		);
	    
    }
}

export default TechStack;