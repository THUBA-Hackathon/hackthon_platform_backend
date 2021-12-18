// 黑客松, 对应设计稿01页的全部内容
// import { Principal } from '@dfinity/principal';
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import React from "react";
import './hackathon.css';
import HackathonList from "./hackathonList";
import Nav from "../nav"
import Swipper from "./swipper"
import Phase from "./phase"
import AddDialog from "./dialogAddHackathon"

let list = [
    {
        url: require("../../assets/example-hackathon.png").default,
        name: '2021 DFINITY x IAF 中国首次黑客松',
        sponsor: 'DFINITY x IAF',
        startdate: '2020-03-01',
        enddate: '2021-05-24'
    },
    {
        url: require("../../assets/example-hackathon.png").default,
        name: '2021 DFINITY x IAF 中国首次黑客松',
        sponsor: 'DFINITY x IAF',
        startdate: '2020-03-01',
        enddate: '2021-05-24'
    },
    {
        url: require("../../assets/example-hackathon.png").default,
        name: '2021 DFINITY x IAF 中国首次黑客松',
        sponsor: 'DFINITY x IAF',
        startdate: '2020-03-01',
        enddate: '2021-05-24'
    },
]

// 每个HackathonInfo传入的参数包括黑客松的图片url,名称name,主办方sponsor,开始日期startdate和结束日期enddate,格式为上方list的格式
class Hackathon extends React.Component{
    // constructor(props) {
    //     super(props);
    
    //     console.log(this.props)
    // }
    async componentDidMount() {
        // get all hackthon
        const list_hackton = await hackthon_platform.listHackthon();
        console.log(list_hackton);
    }
  
    componentWillUnmount() {
    }

    getHackathonData(){
        // get到Hackathon数据,组织成上方List的格式,即若干黑客松信息的列表
    }
    render() {
        return(
            <div>
                <Nav />
                <Swipper />
                <Phase />
                <AddDialog />
                <HackathonList hackathonList={list} />
            </div>
        )
	}
}

export default Hackathon;
