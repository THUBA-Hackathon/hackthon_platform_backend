import React, { useEffect, useState } from "react"
import TeamCard from '../team/team'
import { useUser } from "../../context/user-context";
import { useLoading, useSwitch } from "../Loading";
import { useNavigate } from "react-router-dom";
import { mainColor } from "../../style";
import { DataStateBox } from "../DataStateBox"

const MineTeam = () => {
    const [teamList, setTeamList] = useState([])
    const { closeLoading, openLoading,  } = useLoading()
    const { isOpen, open, close  } = useSwitch()
    const { user } = useUser()
    let navigate = useNavigate();

    useEffect(async () => {
        if (!user.backendActor) return
        openLoading()
        open()
        let team_list = await user.backendActor.getMyTeams();
        closeLoading()
        close()
        setTeamList(team_list)
    }, [user])

    return (
        <DataStateBox data={teamList} loading={isOpen} emptyDesc={
            <div style={{
                color: mainColor,
                cursor: "pointer"
            }} onClick={() => {
                navigate("/")
            }}>暂无团队，加入或创建团队</div>
        }>
            {teamList?.length > 0 && teamList.map((item, index) => {
                return (
                    <TeamCard
                        key={index}
                        intro={item.intro}
                        name={item.name}
                        memberInfos={item.members}
                        skills_needed={item.skills_needed}
                        showJoin={false}
                        teamId={item.id}
                        hackathonId={item.hackathon_id}
                        code_link={item.code_link}
                        video_link={item.video_link}
                        members={item.members}
                    />
                )
            })}
        </DataStateBox>
    )
}

export default MineTeam;