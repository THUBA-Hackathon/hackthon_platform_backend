// 黑客松, 对应设计稿01页的全部内容
import React from "react";
import './hackathon.css';
import HackathonList from "./hackathonList";
import Nav from "../nav"
import Swipper from "./swipper"
import Phase from "./phase"
import AddDialog from "./dialogAddHackathon"
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import { init } from "../../../../declarations/hackthon_platform_assets/hackthon_platform_assets.did";
import UserContext from "../../context/user-context";

// 黑客松信息的结构
// {
//     url: require("../../assets/example-hackathon.png").default,
//     name: '2021 DFINITY x IAF 中国首次黑客松',
//     sponsor: 'DFINITY x IAF',
//     startdate: '2020-03-01',
//     enddate: '2021-05-24'
// }

// 每个HackathonInfo传入的参数包括黑客松的图片url,名称name,主办方sponsor,开始日期startdate和结束日期enddate,格式为上方list的格式
class Hackathon extends React.Component{
    constructor(props) {
        super(props);
        this.state={hackathon_list:[]}
        this.setState = this.setState.bind(this);
    }
    async componentDidMount() {
        var list_hackathon = await hackthon_platform.getHackathonList();
        this.setState({hackathon_list:list_hackathon});
        console.log(list_hackathon);
    }
  
    render() {
        return(
            <div>
                {/* <Nav /> */}
                <Swipper />
                <Phase />
                {/* <AddDialog /> */}
                <UserContext.Consumer>
                    {value => <AddDialog props={value} hackathonList={this.state.hackathon_list} setHackathonList={this.setState}/>}
                </UserContext.Consumer>
                <HackathonList hackathonList={this.state.hackathon_list} />
            </div>
        )
	}
}

export default Hackathon;
