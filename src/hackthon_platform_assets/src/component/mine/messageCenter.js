// 技术栈
import React from "react";
import './mine.css';
import ApplyMessage from "./applyMessage";


// 传入的参数包括申请加入队伍信息List 包括 申请者姓名 申请者来自国家 申请者手机 申请者邮箱 申请者想担任的角色
class MessageCenter extends React.Component{
    render() {
        let dataList = this.props.applyMessageList.map((item, index) => {
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