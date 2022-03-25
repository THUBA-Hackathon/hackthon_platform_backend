// 队伍信息展示卡片
import * as React from 'react';
import Captain from "./captain"
import TechStack from "./techstack"
import JoinTeamDialog from "./dialogJoinTeam";
import { useNavigate } from "react-router-dom";
import { mainColor } from "../../style"
import { useUser } from '../../context/user-context';
import { hackthon_platform } from "../../../../declarations/hackthon_platform";

// 传入的参数包括项目简介，队伍名称，队长昵称，队长email,技术栈列表
export default function TeamCard(props) {
    const navigate = useNavigate();
    const [captain, setCaptain] = React.useState({});

    const handleOnClick = React.useCallback(() => {
        navigate(`/teamDetails/${props.hackathonId}/${props.teamId}`);
    }, [props])

    React.useEffect(async () => {
        if (props.members && props.members[0].id === undefined) {
            const captain = await hackthon_platform.getUserInfo(props.members[0]);
            setCaptain(captain)
            return
        }
        props.members && setCaptain(props.members[0]);
    }, [props.members])

    return (
        <div style={{
            border: `2px solid ${mainColor}`,
            borderRadius: 10,
            width: "100%",
            margin: "0px auto 40px auto"
        }}>
            <div className="flex-between" onClick={handleOnClick} style={{
                padding: "0 40px",
                height: "80px",
                background: "rgba(0, 87, 254, 0.08)",
                cursor: "pointer",
                fontSize: 20,
                lineHeight: '80px'
            }}>
                <div className='ellipsis' style={{ width: "95%", height: 80, fontWeight: 700, color: mainColor }} >{props.slogan}</div>
                <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.7106 13.2373C18.6188 12.9993 18.4663 12.7759 18.2532 12.586L4.69098 0.500593C3.94196 -0.166864 2.72756 -0.166864 1.97853 0.500593L0.622313 1.70913C-0.126708 2.37659 -0.126709 3.45875 0.622312 4.12621L11.819 14.1037L0.854999 23.8738C0.105978 24.5413 0.105977 25.6234 0.854999 26.2909L2.21122 27.4994C2.96024 28.1669 4.17464 28.1669 4.92366 27.4994L18.4859 15.414C19.1505 14.8218 19.2254 13.9031 18.7106 13.2373Z" fill="#0057FE" />
                </svg>
            </div>
            <div style={{ padding: 40 }}>
                <Captain team_name={props.name} name={captain?.name} email={captain?.email} />
            </div>
            <div className="flex-between" style={{
                padding: "0px 40px 40px 40px"
            }}>
                <TechStack techList={props.skills_needed} />
                <JoinTeamDialog teamId={props.teamId} teamInfo={props} />
            </div>
        </div>
    );
}
