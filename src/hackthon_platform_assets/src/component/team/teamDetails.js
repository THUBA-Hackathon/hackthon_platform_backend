// 队伍的详情，已经结束黑客松
import * as React from 'react';
import './team.css';
import Captain from "./captain";
import People from "./people";
import SubmitCodeDialog from "./dialogSubmitCode";
import { useParams } from "react-router-dom";
import { hackthon_platform } from "../../../../declarations/hackthon_platform/index";
import { useLocation } from "react-router-dom";
import UserContext from "../../context/user-context";

// 传入的参数包括队伍口号，队伍简介，队伍成员list，项目链接,队长信息
export default function TeamDetails (){
    const [teamId, setTeamId] = React.useState('')
    const [hackathonId, setHackathonId] = React.useState('')
    const [name, setName] = React.useState('')
    const [intro, setIntro] = React.useState('')
    const [skills, setSkills] = React.useState('')
    const [capName, setCapName] = React.useState('')
    const [capEmail, setCapEmail] = React.useState('')
    const [codeLink, setCodeLink] = React.useState('')
    const [videoLink, setVideoLink] = React.useState('')
    const [members, setMembers] = React.useState([])

    var teamInfo= useLocation().state.teamInfo;
    console.log(teamInfo);
    
    React.useEffect( async ()=>{
        // 这样模拟的是 componentDidMount
        
        setTeamId(teamInfo.team_id);
        setHackathonId(teamInfo.hackathon_id);
        setName(teamInfo.name);
        setIntro(teamInfo.intro);
        setSkills(teamInfo.skills_needed);
        setCapName(teamInfo.cap_name);
        setCapEmail(teamInfo.cap_email);
        setCodeLink(teamInfo.code_link);
        setVideoLink(teamInfo.video_link);

        console.log(capName)
        
        var members = await hackthon_platform.getTeamMembers(teamId);
        setMembers(members);
        console.log(members)

    }, [])

    let memberList = members.map((item, index) => {
        return (<People key={index} name={item.name} email={item.email} />)
    });
    return (
        <div className="team_details">
            <div className="team_title">{name}</div>
            <Captain team_name={name} name={capName} email={capEmail}/>
            <div className="divider">项目介绍</div>
            <div className="details_project_intro">{intro}</div>
            {/*<div className="details_project_link">{this.props.data.project_link}</div>*/}
            <div className="divider1">团队成员</div>
            {memberList}
            <UserContext.Consumer>
                {value => <SubmitCodeDialog props={value} teamId={teamId} setCodeLink={setCodeLink} setVideoLink={setVideoLink} capName={capName}/>}
            </UserContext.Consumer>
            <div className="details_project_intro">项目链接: {codeLink}</div>
            <div className="details_project_intro">演示视频: {videoLink}</div>
        </div>
    );
    
}

