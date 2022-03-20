// 队伍的详情，已经结束黑客松
import * as React from 'react';
import Captain from "./captain";
import { hackthon_platform } from "../../../../declarations/hackthon_platform/index";
import { useLocation } from "react-router-dom";
import UserContext from "../../context/user-context";
import { mainColor, mainWidth, mainIndigoColor, bgColorShallow } from "../../style"
import JoinTeamDialog from "./dialogJoinTeam";
import UserContext, { useUser } from "../../context/user-context";
import { useLoading } from "../Loading"
import { DataStateBox } from "../DataStateBox"
import { useLoading, useSwitch } from "../Loading"

// 传入的参数包括队伍口号，队伍简介，队伍成员list，项目链接,队长信息
export default function TeamDetails() {
    const [teamId, setTeamId] = React.useState('')
    const [hackathonId, setHackathonId] = React.useState('')
    const [name, setName] = React.useState('')
    const [intro, setIntro] = React.useState('')
    const [skills, setSkills] = React.useState('')
    const [capName, setCapName] = React.useState('')
    const [capEmail, setCapEmail] = React.useState('')
    const [codeLink, setCodeLink] = React.useState('')
    const [videoLink, setVideoLink] = React.useState('')
    const [members, setMembers] = React.useState([]);
    const { closeLoading, openLoading } = useLoading()
    const { isOpen, open, close } = useSwitch()

    var locationTeamInfo = useLocation().state.teamInfo

    React.useEffect(() => {
        if (!locationTeamInfo) return
        window.localStorage.setItem("teamInfo", JSON.stringify(locationTeamInfo))
    }, [locationTeamInfo])

    const teamInfo = React.useMemo(() => {
        if (locationTeamInfo) {
            return locationTeamInfo
        } else {
            return JSON.parse(window.localStorage.setItem("teamInfo"))
        }
    }, [locationTeamInfo])

    React.useEffect(async () => {
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

        // var memberList = await user.backendActor.getTeamMembers(teamId);
        // setMembers(memberList);
        // console.log(memberList);


        /* var teamList = await hackthon_platform.getTeamList(teamInfo.hackathon_id);
        
        let teamMembers = [];
        for (let i = 0; i < teamList.length; i++) {
            if (teamList[i].id == teamInfo.team_id) {
                for (let j = 0; j < teamList[i].members.length; j++) {
                    let member = await hackthon_platform.getUserInfo(teamList[i].members[j]);
                    teamMembers.push(member);
                }
            }
        } */

        let teamMembers = [];
        openLoading()
        open()
        for (let i = 0; i < teamInfo?.members?.length; i++) {
            let member = await hackthon_platform.getUserInfo(teamInfo?.members[i]);
            teamMembers.push(member);
        }
        console.log(teamInfo?.members)
        close()
        closeLoading()
        setMembers(teamMembers)
    }, [])

    return (
        <div>
            <div style={{
                width: mainWidth,
                margin: "40px auto"
            }}>
                <div style={{
                    fontFamily: "Helvetica",
                    fontSize: 30,
                    color: mainColor
                }}>“Hacker Valley，在交流中，实现创意；在实践中，进行创新。”</div>
                <div style={{ width: 80, height: 5, background: mainIndigoColor, margin: "30px 0" }}></div>
                <div className='flex-between'>
                    <Captain team_name={name} name={capName} email={capEmail} />
                    {<UserContext.Consumer>
                        {value => <JoinTeamDialog props={value} teamId={teamId} />}
                    </UserContext.Consumer>}
                </div>
            </div>
            <div style={{
                background: bgColorShallow,
                padding: "40px 0"
            }}>
                <div style={{
                    width: mainWidth,
                    margin: "auto"
                }}>
                    <div style={{ color: mainColor, fontSize: 30, fontWeight: 700, marginBottom: 20 }}>Project Introduction</div>
                    <div dangerouslySetInnerHTML={{ __html: intro }}></div>
                </div>
            </div>
            {/*<div className="details_project_link">{this.props.data.project_link}</div>*/}
            <div style={{
                width: mainWidth,
                margin: "40px auto"
            }}>
                <div style={{ color: mainColor, fontSize: 30, fontWeight: 700 }}>Team Members</div>
                <DataStateBox notNeedUser data={members} loading={isOpen} emptyDesc="No Team Members Data">
                    <div style={{
                        display: "flex",
                        alignItmes: "center",
                        flexWrap: "wrap",
                        width: "100%"
                    }}>
                        {members.map((item, index) => {
                            return (<Captain key={index} name={item.name} email={item.email} width={mainWidth / 3 - 20}
                                css={{
                                    margin: "0 20px 20px 0",
                                    border: `2px solid ${mainColor}`,
                                    padding: 15,
                                    paddingRight: 5,
                                    borderRadius: 5
                                }} />)
                        })}
                    </div>
                </DataStateBox>
            </div>

            {/* <UserContext.Consumer>
                {value => <SubmitCodeDialog props={value} teamId={teamId} setCodeLink={setCodeLink} setVideoLink={setVideoLink} capName={capName} />}
            </UserContext.Consumer>
            <div className="divider1"></div>
            <div className="details_project_intro">项目链接: {codeLink}</div>
            <div className="details_project_intro">演示视频: {videoLink}</div> */}
        </div >
    );

}

