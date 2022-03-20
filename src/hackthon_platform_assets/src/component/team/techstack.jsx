// 技术栈
import React from "react";
import { mainColor, mainWidth } from "../../style";
import OneTech from "./tech";

class OneTech extends React.Component {
    render() {
        return (
            <div style={{
                marginLeft: "20px",
                marginBottom: "10px",
                textAlign: "center",
                padding: "3px 15px",
                background: "rgba(187, 196, 253, 0.2)",
                border: "1px solid #0057FE",
                borderRadius: "19.5px",
                fontFamily: "Helvetica",
                fontSize: "20px",
            }}>
                {this.props.tech}
            </div >
        );
    }
}

// 传入的参数包括技术栈列表techList
class TechStack extends React.Component {
    render() {
        let dataList = this.props.techList.map((item, index) => {
            return (<OneTech key={index} tech={item} />);
        })
        return (
            <div style={{
                fontFamily: "Helvetica",
                fontStyle: "normal",
                fontWeight: "normal",
                color: mainColor,
                width: `calc(${mainWidth}${typeof mainWidth === "number" ? "px" : ""} - 260px)`,
                display: "flex"
            }}>
                <div style={{
                    fontWeight: 700,
                    fontSize: 18
                }}>WE NEED:</div>
                <div style={{
                    width: `calc(100% - 100px)`,
                    display: "flex",
                    alignItmes: "center",
                    flexWrap: "wrap",
                }}>
                    {dataList}
                </div>
            </div >
        );

    }
}

export default TechStack;
