// 黑客松, 对应设计稿01页的全部内容
import React, { useCallback, useState, useEffect } from "react";
import { mainWidth } from "../../style";
import { AddHackathon } from "./AddHackathon";
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import { useSwitch } from "../Loading"
import { DataStateBox } from "../DataStateBox"
import { HackathonInfo } from "./hackathonList";
import { useUser } from "../../context/user-context";

// 此处添加可以创建黑客松的白名单id
const CREATE_HACKATHON_USER = [
    "z2ypx-3zr5b-ocpje-wruch-2azmi-pfpl6-ghdc2-g3zhl-3dcwa-zsa6r-3ae",
    "qmkmb-2k4p3-chw76-nd7bu-qqxwg-d3u3s-3p5ev-5oxk6-hkwf2-4d4gb-pae",
    "xysqw-zrknq-575sn-w3ymw-35dei-hr5vb-5ud7b-sxtkx-penhp-w5nna-fae",
    "wn2fq-v47jv-hrydn-v5hea-pcpbc-nuemw-4g5wb-qecas-bxqv3-xzc3w-7ae",
    "oixhp-z3mef-rkr2e-4yfan-46jc7-6sji2-ulxz5-javyd-uga3l-dq3sh-nae",
    "5aslw-f3cet-fakwv-7hs7s-3qxjt-tavec-ohgsm-orz5l-bpkmn-zinek-yqe"
]

const HomeInfo = () => {
    return (
        <div>
            <div style={{
                backgroundImage: "linear-gradient(to right, #f4f8ed, #f2fbfb)",
                padding: 30,
                minWidth: mainWidth,
                color: "#12141D"
            }}>
                <div className="flex-between" style={{ margin: "auto", paddingLeft: 50 }}>
                    <div style={{
                        fontFamily: 'Public Sans',
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: 60
                    }}>
                        <div>Innovation at</div>
                        <div>it’s best.</div>
                    </div>
                    <div className="flex-y-center" style={{
                        marginRight: 200
                    }}>
                        <img src={require("../../../assets/person.png")} alt="" style={{ height: 50 }} />
                        <div style={{ marginLeft: 40, color: "#12141D" }}>
                            <p style={{ fontWeight: 700, fontSize: 30 }}>Join us!</p>
                            <p>Let’s hackathon.</p>
                        </div>
                    </div>
                </div>
            </div>

            <img src="home-big.jpg" style={{ width: "100%" }} />
            <div style={{ textAlign: "center", color: "#12141D", paddingTop: "50px" }}>
                <p style={{ fontWeight: 700, fontSize: 30, marginBottom: 20 }}>Our power is in our partner</p>
                <p>We seek those who seek adventure, which is how we continuously</p>
                <p>raise the bar for ourselves, each other.</p>
            </div>
        </div>
    )
}

const Hackathon = () => {
    const [hackathonList, setHackathon_list] = useState([])
    const { isOpen, open, close } = useSwitch()
    const { user } = useUser()

    const getHackathonList = useCallback(async () => {
        open()
        try {
            var list_hackathon = await hackthon_platform.getHackathonList();
            setHackathon_list(list_hackathon);
            close()
        } catch (error) {
            close()
        }
    }, [])

    useEffect(() => {
        getHackathonList()
    }, [])

    return (
        <div>
            <HomeInfo />
            {/* <Swipper /> */}
            {/* <Phase /> */}
            {CREATE_HACKATHON_USER?.includes(user?.userInfo?.id) && <AddHackathon getHackathonList={getHackathonList} />}
            <DataStateBox notNeedUser data={hackathonList} loading={isOpen} emptyDesc="No Hackathon Data" SkeletonCSS={{ width: mainWidth }}>
                {hackathonList.map((item, index) => {
                    return (<HackathonInfo key={index} {...item} url={item.image_id || "example-hackathon.png"} />)
                })}
            </DataStateBox>
        </div>
    )
}

export default Hackathon;
