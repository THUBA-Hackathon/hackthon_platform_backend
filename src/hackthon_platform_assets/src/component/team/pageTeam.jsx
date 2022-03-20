import React from "react";
import TeamCard from "./team";
import AddProjectDialog from "./dialogAddProject";
import { mainWidth } from "../../style";

const PageTeam = (props) => {
    const { teamList, hackathonId, userid, setTeamList } = props

    return (
        <div style={{ width: mainWidth, margin: "auto" }}>
            {teamList?.map((item, index) => {
                return (
                    <div className="team_card_with_join_btn" key={index}>
                        <TeamCard
                            intro={item.intro}
                            name={item.name}
                            memberInfos={item.members}
                            skills_needed={item.skills_needed}
                            showJoin={true}
                            teamId={item.id}
                            hackathonId={hackathonId}
                            code_link={item.code_link}
                            video_link={item.video_link}
                            members={item.members}
                        />
                    </div>)
            })}
            <AddProjectDialog
                hackathonId={hackathonId}
                userId={userid}
                setTeamList={setTeamList}
            />
        </div>
    );
}

export default PageTeam;
