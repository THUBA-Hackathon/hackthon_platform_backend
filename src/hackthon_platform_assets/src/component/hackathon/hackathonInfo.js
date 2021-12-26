// 单个黑客松简略信息,包括图片和文字
import React from "react";
import './hackathon.css';
import HackathonBrief from "./hackathonBrief";
import { createBrowserHistory } from 'history';


import { useNavigate } from 'react-router-dom';

// const history = createBrowserHistory()

// 传入的参数包括黑客松的图片url,名称name,主办方sponsor,开始日期startdate和结束日期enddate
class HackathonInfo extends React.Component{
    handleClick ()  {
        navigate('/#/details')
        // navigate({pathname:'/#/details', state:{id:this.props.id}})
        // history.push('/#/details')
        window.location.reload()
        // const href = window.location.origin + window.location.hash;
        // window.history.pushState({}, 0, href);
    };
    render() {
        const handleButtonClick = (value) => {
            const navigate = useNavigate();
            console.log(value);
            navigate({pathname:'/#/details', state:{id:value}})
        }
		return (
            <div className="hackathon_info" onClick={handleButtonClick.bind()}>
                <div className="hackathon_img"><img src={this.props.url} alt=""/></div>
                <HackathonBrief name={this.props.name} sponsor={this.props.sponsor} startdate={this.props.startdate} enddate={this.props.enddate}/>
                <div className="hackathon_card_arrow"><img className="card_arrow_img" src={require("../../assets/arrow.svg").default} alt=""/></div>
            </div>
		);
	}
}

export default HackathonInfo;
