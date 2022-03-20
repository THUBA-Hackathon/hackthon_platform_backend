// 添加队伍
import React from "react";
import { mainColor, bgColorDeep } from "../../style";

// 传入的参数包括项目简介，队伍名称，队长昵称，队长email,技术栈列表
class AddTeam extends React.Component {
    render() {
        return (
            <div style={{
                border: `2px dashed ${mainColor}`,
                borderRadius: 10,
                background: bgColorDeep,
                position: "relative"
            }}>
                <div className="intro_font" style={{ position: "absolute", top: 20, left: 40, color: mainColor, fontSize: 24, fontWeight: 700 }}>
                    Create a Team Project
                </div>
                <div className="flex-center" style={{ height: 200 }}>
                    <svg width={20} height={20} viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M61.64 23.72V38.96H39.08V61.88H23V38.96H0.440001V23.72H23V0.68H39.08V23.72H61.64Z" fill="#0057FE" />
                    </svg>
                </div>
            </div>
        );
    }
}

export default AddTeam;
