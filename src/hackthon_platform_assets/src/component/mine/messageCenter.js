// 技术栈
import React from "react";
import './mine.css';
import ApplyMessage from "./applyMessage";
import { hackthon_platform } from "../../../../declarations/hackthon_platform";


// 传入的参数包括申请加入队伍信息List 包括 申请者姓名 申请者来自国家 申请者手机 申请者邮箱 申请者想担任的角色
class MessageCenter extends React.Component{
    constructor(props) {
        super(props);
        this.state={applyMessageList:[]}
    }
    async componentDidMount() {
        var message_list = await hackthon_platform.getMessage();
        this.setState({applyMessageList:message_list});
        console.log(message_list);
    }
    render() {
        let dataList = this.state.applyMessageList.map((item, index) => {
            return (<ApplyMessage key={index} {...item} />);
        })
		return (
            <div className="message_center">
                {dataList}
            </div>
		);
	    
    }
}

export default MessageCenter;