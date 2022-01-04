// 黑客松列表, 对应设计稿01页的黑客松列表
import React from "react";
import './hackathon.css';
import HackathonInfo from "./hackathonInfo";
import Footer from "../footer"

// 每个HackathonInfo传入的参数包括黑客松的图片url,名称name,主办方sponsor,开始日期startdate和结束日期enddate,格式为上方list的格式
class HackathonList extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let dataList = this.props.hackathonList.map((item, index) => {
            return (<HackathonInfo key={index}  id={item.id} url="example-hackathon.png" name={item.name} sponsor={item.sponsor} startdate={item.startdate} enddate={item.enddate}/>)
            // {...item}相当于下面的5句代码 es6的扩展运算符
            // url={item.url}
            // name={item.name}
            // sponsor={item.sponsor}
            // startdate={item.startdate}
            // enddate={item.enddate}
        });
        return(
            <div className="hackathon_list">
                {dataList}
                <Footer />
            </div>
        )
	}
}

export default HackathonList;
