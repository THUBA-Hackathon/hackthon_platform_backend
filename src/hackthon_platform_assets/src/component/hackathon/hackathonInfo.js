// 单个黑客松简略信息,包括图片和文字
import React from "react";
import './hackathon.css';
import HackathonBrief from "./hackathonBrief";
import { createBrowserHistory } from 'history';
import { useNavigate } from "react-router-dom";


const history = createBrowserHistory()

// 传入的参数包括黑客松的图片url,名称name,主办方sponsor,开始日期startdate和结束日期enddate

export default function HackathonInfo(props){
    let navigate = useNavigate();
    // render() {
        const handleClick = (() => {
            navigate('/details/' + (props.id))
        })
		return (
            <div className="hackathon_info" onClick={handleClick}>
                <img className="hackathon_img" src={props.url} alt=""/>
                <HackathonBrief id={props.id} name={props.name} sponsor={props.sponsor} startdate={props.startdate} enddate={props.enddate}/>
                <div className="hackathon_card_arrow"><img className="card_arrow_img" src="arrow.svg" alt=""/></div>
            </div>
		);
	// }
}

