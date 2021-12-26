// 单个黑客松详细信息, 对应设计稿03页的赛事详情部分
import React from "react";
import './hackathon.css';
import Tabs from '@uiw/react-tabs';
import PageTeam from "../team/pageTeam";
import footer from "../footer"
import Footer from "../footer";

let list = [
    {
        intro: "一个Web 3.0下的社区项目",
        team_name: 'NFit',
        cap_name: '马克',
        email: '2568198278@qq.com',
        techList: ["Rust", "Mokoto", "数据结构", "前端设计"],
        showJoin: true,
    },
    {
        intro: "Web 3.0下的学校项目",
        team_name: 'NFit',
        cap_name: '皮特',
        email: '2583026353@qq.com',
        techList: ["Vue", "Typescript", "数据结构", "网络"],
        showJoin: true,
    },
    {
        intro: "NFT项目",
        team_name: 'NFit',
        cap_name: '华飞',
        email: '2568198278@qq.com',
        techList: ["Rust", "Mokoto", "数据结构", "前端设计"],
        showJoin: true,
    },
]
// 传入的参数包括黑客松的海报图片url,赛事介绍详细内容words
class HackathonDetails extends React.Component{
    render() {
		return (
            <Tabs className="tabs" activeKey="1" type="line">
                    <Tabs.Pane label="赛事详情" key="1">
                        <div className="hackathon_details_words">
                            <div className="hackathon_date">{this.props.startdate} - {this.props.enddate}</div>
                            <div className="hackathon_words">{this.props.words}</div>
                        </div>
                    </Tabs.Pane>
                    <Tabs.Pane label="我要参赛" key="2">
                        <PageTeam teamList={list}/>
                    </Tabs.Pane>

            </Tabs>
		);
	}
}

export default HackathonDetails;
