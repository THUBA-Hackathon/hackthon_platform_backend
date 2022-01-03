// 页面顶部栏
import React from "react";
import '../App.css';
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
import { AuthClient } from "@dfinity/auth-client";


export default function Nav() { 
// class Nav extends React.Component{
    const init = async () => {
        const authClient = await AuthClient.create();
        // authClient.login({
        //     onSuccess: async () => {
        //       // authClient now has an identity
        //     },
        // });
      }
    
    // render() {
        const handleOnClick = (() => {
            history.push('/#/mine')
            window.location.reload()
        })
        const handleOnClick1 = (() => {
            history.push('/#/')
            window.location.reload()
        })
		return (
            <div className="nav">
                <img className="nav_logo_img" src={require("../../assets/logo.png").default} alt="" onClick={handleOnClick1}/>
                <div className="nav_logo" onClick={handleOnClick1}>Hacker Valley</div>
                <div className="nav_hackathon" onClick={handleOnClick1}>黑客松</div>
                {/* <div className="nav_projects">项目展示</div> */}
                <div className="nav_search"></div> {/* 搜索框 */}
                <div className="nav_address" onClick={init}>address</div>{/* 用户钱包地址或用户id */}
                <img className="nav_img_mine" src={require("../../assets/icon_mine.png").default} alt=""/>
                <div className="nav_mine" onClick={handleOnClick}>我的</div>{/* 跳转到账户管理 */}
            </div>
		);
	// }
}

