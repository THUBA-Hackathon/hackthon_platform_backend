// 页面顶部栏
import React from "react";
import '../App.css';

class Nav extends React.Component{
    render() {
		return (
            <div className="nav">
                <img className="nav_logo_img" src={require("../assets/logo.png").default} alt=""/>
                <div className="nav_logo">Hacker Valley</div>
                <div className="nav_hackathon">黑客松</div>
                <div className="nav_projects">项目展示</div>
                <div className="nav_search"></div> {/* 搜索框 */} 
                <div className="nav_address">address</div>{/* 用户钱包地址或用户id */} 
                <img className="nav_img_mine" src={require("../assets/icon_mine.png").default} alt=""/>
                <div className="nav_mine">我的</div>{/* 跳转到账户管理 */} 
            </div>
		);
	}
}

export default Nav;
