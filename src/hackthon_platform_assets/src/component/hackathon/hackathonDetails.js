// 单个黑客松详细信息, 对应设计稿03页的赛事详情部分
import React from "react";
import './hackathon.css';
import Tabs from '@uiw/react-tabs';
import PageTeam from "../team/pageTeam";
import { useParams } from "react-router-dom";
import { hackthon_platform } from "../../../../declarations/hackthon_platform";

// 传入的参数包括黑客松的海报图片url,赛事介绍详细内容words
export default function HackathonDetails(props) {
    const [ hackathon,  setHackathon ] = React.useState({})
    const [ teamlist, setTeamList ] = React.useState([])
    let params = useParams()
    const id = params.id
    React.useEffect( async ()=>{
        // 这样模拟的是 componentDidMount
        var list_hackathon = await hackthon_platform.getHackathonList();
        for(let i = 0; i < list_hackathon.length; i++) {
            if(list_hackathon[i].id === id){
                setHackathon(list_hackathon[i]);
                break;
            }
        }
        var list_team = await hackthon_platform.getTeamList(id);
        console.log(list_team);
        setTeamList(list_team);
    }, [])

	return (
        <Tabs className="tabs" activeKey="1" type="line">
            <Tabs.Pane label="赛事详情" key="1">
                <div className="hackathon_details_words">
                    <div className="hackathon_date">{hackathon.startdate} - {hackathon.enddate}</div>
                    <div className="hackathon_words">{hackathon.intro}</div>
                </div>
            </Tabs.Pane>
            <Tabs.Pane label="我要参赛" key="2">
                <PageTeam teamList={teamlist} setTeamList={setTeamList} hackathonId={id} userid='test'/>
            </Tabs.Pane>
        </Tabs>
	);
}


