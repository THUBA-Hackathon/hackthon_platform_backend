// 单个黑客松详细信息, 对应设计稿03页页面
import React from "react";
import { useSearchParams, useParams } from 'react-router-dom';
import PageTeam from "../team/pageTeam";
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import { mainColor, textColor, bgColor, mainWidth, mainIndigoColor } from "../../style"
import { useLoading, useSwitch } from "../Loading"
import { DataStateBox } from "../DataStateBox"
import { Time } from "./hackathonList"

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
        var list_team = await hackthon_platform.getTeamList(id);
        close()
        console.log(list_team)
        setTeamList(list_team);
        closeLoading()
    }, [])

    return (
        <DataStateBox notNeedUser data={hackathon} loading={isOpen} emptyDesc="No Hackathon Data" SkeletonCSS={{ width: mainWidth }}>
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
                {tab === "1" && <div style={{ color: textColor, fontSize: 20 }}>
                    <p style={{ width: mainWidth, margin: "auto", fontWeight: 700, marginBottom: 15, fontSize: 24 }}>{hackathon?.name}</p>
                    <Time startdate={hackathon.startdate} enddate={hackathon.enddate} css={{ width: mainWidth, margin: "auto", fontWeight: 700 }} />
                    <div style={{
                        background: bgColor,
                        marginTop: 50,
                        padding: "50px 0"
                    }}>
                        <div style={{ width: mainWidth, margin: "auto", fontSize: 16 }} dangerouslySetInnerHTML={{ __html: hackathon.intro }}></div>
                    </div>
                </div>}
                {tab === "2" && <PageTeam teamList={teamlist} setTeamList={setTeamList} hackathonId={id} userid='test' />}
            </div>
        </DataStateBox>
    );
}


// 传入的参数包括黑客松的海报图片url,赛事介绍详细内容words
const PageDetails = () => {
    return (
        <div>
            <img src={require("../../../assets/details/header_poster.png")} alt="" style={{ width: "100%", height: "auto" }} />
            <HackathonDetails />
        </div>
    );
}

export default PageDetails;
