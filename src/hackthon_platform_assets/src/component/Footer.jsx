// 页面底部栏
import React from "react";
import { bgColorShallow, mainWidth, textColor } from "../style"

const FooterData = [
    {
        title: "Company",
        list: [
            {
                name: "About",
                herf: ""
            },{
                name: "Features",
                herf: ""
            },{
                name: "Works",
                herf: ""
            },{
                name: "Career",
                herf: ""
            }
        ]
    },{
        title: "Help",
        list: [
            {
                name: "Customer Support",
                herf: ""
            },{
                name: "Delivery Details",
                herf: ""
            },{
                name: "Terms & Conditions",
                herf: ""
            },{
                name: "Privacy Policy",
                herf: ""
            }
        ]
    },{
        title: "Resources",
        list: [
            {
                name: "Free eBooks",
                herf: ""
            },{
                name: "How to - Blog",
                herf: ""
            },{
                name: "Youtube Playlist",
                herf: ""
            }
        ]
    },{
        title: "Links",
        list: [
            {
                name: "How to - Blog",
                herf: ""
            },{
                name: "Youtube Playlist",
                herf: ""
            }
        ]
    }
]

const Footer = () => {
    return (
        <div style={{
            backgroundColor: bgColorShallow,
            color: textColor
        }}>
            <div style={{
                width: mainWidth,
                margin: "auto",
                padding: "40px 0",
                display: "flex",
                justifyContent: "space-between"
            }}>
                {
                    FooterData.map((item, index) => {
                        return (
                            <div key={index}>
                                <h3>{item.title}</h3>
                                {
                                    item.list.map((ite, i) => {
                                        return (
                                            <a
                                                key={i}
                                                href={ite.herf || "/#/"}
                                                //target="_blank"
                                                style={{ color: textColor, display: "block", textDecoration: "none", marginTop: i === 0 ? 20 : 10 }}
                                            >{ite.name}</a>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div
                className="flex-between"
                style={{ borderTop: `1px solid ${textColor}`, margin: "auto", width: mainWidth, padding: "50px 0px" }}>
                <p>© Copyright 2022, All Rights Reserved</p>
                <p>Privacy Policy Terms & Conditions</p>
            </div>
        </div>
    );
}

export default Footer;
