// 单个黑客松详细信息, 对应设计稿03页页面
import React, { useCallback } from "react";
import { useSearchParams, useParams } from 'react-router-dom';
import PageTeam from "../team/pageTeam";
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import { mainColor, textColor, bgColor, mainWidth } from "../../style"
import { useLoading, useSwitch } from "../Loading"
import { DataStateBox } from "../DataStateBox"
import { Time } from "./hackathonList"
import { LoadImage } from "../Image";

export const Tab = ({ title, setTab, tab, index, css }) => {
    const [_, setSearchParams] = useSearchParams();
    return (
        <div
            onClick={() => {
                setTab(index)
                setSearchParams({ tab: index })
            }}
            style={{
                color: index === tab ? mainColor : textColor,
                paddingBottom: 5,
                borderBottom: `3px solid ${index === tab ? mainColor : "transparent"}`,
                cursor: "pointer",
                fontSize: 30,
                fontWeight: 700,
                ...css
            }}
        >{title}</div>
    )
}

// 传入的参数包括黑客松的海报图片url,赛事介绍详细内容words
const HackathonDetails = () => {
    const { closeLoading, openLoading } = useLoading()
    const { isOpen, open, close } = useSwitch()
    const [searchParams] = useSearchParams();
    const [hackathon, setHackathon] = React.useState({})
    const [teamlist, setTeamList] = React.useState([])
    const defaultTab = searchParams?.get('tab') || "1";
    const [tab, setTab] = React.useState(defaultTab)
    let params = useParams()
    const id = params?.id

    React.useEffect(async () => {
        // 这样模拟的是 componentDidMount
        openLoading()
        open()
        var list_hackathon = await hackthon_platform.getHackathonList();
        for (let i = 0; i < list_hackathon.length; i++) {
            if (list_hackathon[i].id === id) {
                setHackathon(list_hackathon[i]);
                break;
            }
        }
        getTeams(id)
    }, [])

    const getTeams = async (id) => {
        open()
        var list_team = await hackthon_platform.getTeamList(id);
        close();
        setTeamList(list_team);
        closeLoading()
    }

    return (
        <div>
            {hackathon?.image_id && <LoadImage src={hackathon?.image_id} css={{ width: "100%", height: "auto" }} SkeletonCSS={{ width: "100%", height: 300 }} /> }
            <div style={{ background: bgColor, paddingTop: 20, width: "100%" }}>
                <div style={{
                    display: "flex",
                    width: mainWidth,
                    margin: 'auto'
                }}>
                    <Tab title="Details" setTab={setTab} tab={tab} index="1" />
                    <Tab title="Join" setTab={setTab} tab={tab} index="2" css={{ marginLeft: 50 }} />
                </div>
            </div>
            <div style={{ marginTop: 60, width: "100%" }}>
                {tab === "1" && <DataStateBox notNeedUser data={hackathon} loading={isOpen} emptyDesc="No Hackathon Data" SkeletonCSS={{ width: mainWidth }}>
                    <div style={{ color: textColor, fontSize: 20, width: "100%" }}>
                        <p style={{ width: mainWidth, margin: "auto", fontWeight: 700, marginBottom: 15, fontSize: 24 }}>{hackathon?.name}</p>
                        <Time startdate={hackathon.startdate} enddate={hackathon.enddate} css={{ width: mainWidth, margin: "auto", fontWeight: 700 }} />
                        <div style={{
                            background: bgColor,
                            marginTop: 50,
                            padding: "50px 0",
                            width: "100%"
                        }}>
                            <div style={{ width: mainWidth, margin: "auto", fontSize: 16 }} dangerouslySetInnerHTML={{ __html: hackathon.intro?.replace(/\t/g,'<span style="color: transparent !important">空</span>') }}></div>
                        </div>
                    </div>
                </DataStateBox>}
                {tab === "2" && <DataStateBox notNeedUser data={hackathon} loading={isOpen} emptyDesc="No Hackathon Data" SkeletonCSS={{ width: mainWidth }}>
                    <PageTeam teamList={teamlist} hackathonId={id} getTeams={getTeams} />
                </DataStateBox>}
            </div>
        </div>
    );
}

export default HackathonDetails;
