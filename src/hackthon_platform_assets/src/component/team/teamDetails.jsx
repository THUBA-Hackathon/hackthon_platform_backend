// 队伍的详情，已经结束黑客松
import * as React from 'react';
import Captain from "./captain";
import { hackthon_platform } from "../../../../declarations/hackthon_platform/index";
import { useParams } from "react-router-dom";
import { mainColor, mainWidth, mainIndigoColor, bgColorShallow } from "../../style"
import JoinTeamDialog from "./dialogJoinTeam";
import { DataStateBox } from "../DataStateBox"
import { useSwitch } from "../Loading"

// 传入的参数包括队伍口号，队伍简介，队伍成员list，项目链接,队长信息
export default function TeamDetails() {
    const { isOpen, open, close } = useSwitch()
    const [teamInfo, setTeamInfo] = React.useState({});
    let params = useParams()

    const getTeams = async () => {
        open()
        //var list_team = await hackthon_platform.getTeamList(params.hackathonID);
        //const teamInfo = list_team?.find(item => item.id === params.teamID);
        const teamInfo = await hackthon_platform.getTeamInfo(params.teamID);
        console.log(teamInfo)
        setTeamInfo({
            ...teamInfo[0],
            members: teamInfo[1]
        });
        close();
    }

    React.useEffect(() => {
        if (params.hackathonID && params.teamID) {
            getTeams()
        }
    }, [params])

    return (
        <DataStateBox notNeedUser data={teamInfo} loading={isOpen} emptyDesc="No Team Details Data" SkeletonCSS={{ width: mainWidth }}>
            <>
                <div style={{
                    width: mainWidth,
                    margin: "40px auto"
                }}>
                    <div style={{
                        fontFamily: "Helvetica",
                        fontSize: 30,
                        color: mainColor
                    }}>{teamInfo?.slogan}</div>
                    <div style={{ width: 80, height: 5, background: mainIndigoColor, margin: "30px 0" }}></div>
                    <div className='flex-between'>
                        <Captain team_name={teamInfo?.name} name={teamInfo?.members ? teamInfo?.members[0]?.name : ""} email={teamInfo?.members ? teamInfo?.members[0]?.email : ""} />
                        <JoinTeamDialog teamId={teamInfo?.id} members={teamInfo?.members} getTeams={getTeams} teamInfo={teamInfo} />
                    </div>
                </div>
                <div style={{
                    background: bgColorShallow,
                    padding: "40px 0",
                    width: "100%",
                }}>
                    <div style={{
                        width: mainWidth,
                        margin: "auto"
                    }}>
                        <div style={{ color: mainColor, fontSize: 30, fontWeight: 700, marginBottom: 20 }}>Project Introduction</div>
                        <div dangerouslySetInnerHTML={{ __html: teamInfo?.intro?.replace(/\t/g,'<span style="color: transparent">空</span>') }}></div>
                    </div>
                </div>
                {teamInfo?.members?.length > 0 && <div style={{
                    width: mainWidth,
                    margin: "40px auto 0px auto"
                }}>
                    <div style={{ color: mainColor, fontSize: 30, fontWeight: 700 }}>Team Members</div>
                    <div style={{
                        display: "flex",
                        alignItmes: "center",
                        flexWrap: "wrap",
                        width: "100%"
                    }}>
                        {teamInfo?.members.map((item, index) => {
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
                </div>}

                <div style={{
                    width: mainWidth,
                    margin: "20px auto"
                }}>
                    {(teamInfo?.code_link || teamInfo?.video_link) && <div style={{ color: mainColor, fontSize: 30, fontWeight: 700 }}>Submit Info</div> }
                    {teamInfo?.code_link && <div>
                        Code:  <a href={teamInfo?.code_link} target="_blank" style={{ color: mainColor }}>{teamInfo?.code_link}</a>
                    </div>}
                    {teamInfo?.video_link && <div>
                        Video: <a href={teamInfo?.video_link} target="_blank" style={{ color: mainColor }}>{teamInfo?.video_link}</a>
                    </div>}
                </div>
            </>
        </DataStateBox>
    );
}