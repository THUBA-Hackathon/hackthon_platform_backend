// 队伍信息展示卡片
import * as React from 'react';
import './team.css';
import Captain from "./captain"
import TechStack from "./techstack"
import JoinTeamDialog from "./dialogJoinTeam";
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/user-context";
import { hackthon_platform } from '../../../../declarations/hackthon_platform/index';
import { Link } from '../../../../../node_modules/react-router-dom/index';


// 传入的参数包括项目简介，队伍名称，队长昵称，队长email,技术栈列表
export default function TeamCard(props) {
    const [capName, setCapName] = React.useState('');
    const [capEmail, setCapEmail] = React.useState('');

    let navigate = useNavigate()
    const handleOnClick = (() => {
        navigate('/teamDetails/' , {state : 
            {
                
                teamInfo: {
                    team_id: props.teamId, 
                    hackathon_id: props.hackathonId, 
                    name: props.name, 
                    intro: props.intro, 
                    skills_needed: props.skills_needed,
                    cap_name: capName,
                    cap_email: capEmail,
                    code_link: props.code_link,
                    video_link: props.video_link
                }
            
                
            }, replace: true})
    })
    React.useEffect(async () => {
        var capInfo = await hackthon_platform.getUserInfo(props.memberInfos[0]).then(result => { return result });
        console.log(capInfo)
        setCapName(capInfo.name)
        setCapEmail(capInfo.email)
    }, [])
    return (
        <div className="team_card">
            <div className="project_intro_btn" onClick={handleOnClick}>{props.intro}</div>
            <Captain team_name={props.name} name={capName} email={capEmail} />
            {/* email={this.props.email} */}
            <TechStack techList={props.skills_needed} />
            
                {props.showJoin ? (
                    <UserContext.Consumer>
                        {value => <JoinTeamDialog props={value} teamId={props.teamId}/>}
                    </UserContext.Consumer>) : ''}
            
        </div>
    );
}
