// 黑客松, 对应设计稿01页的全部内容
import React from "react";
import { mainWidth } from "../../style";
import HackathonList from "./hackathonList";

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
                        <img src={require("../../../assets/person.png")} alt="" style={{ height: 50 }}/>
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
    return (
        <div>
            <HomeInfo />
            {/* <Swipper /> */}
            {/* <Phase />
                {/* <AddDialog /> */}
            {/* <UserContext.Consumer>
                    {value => <AddDialog props={value} hackathonList={this.state.hackathon_list} setHackathonList={this.setState}/>}
                </UserContext.Consumer> */}
            <HackathonList />
        </div>
    )
}

export default Hackathon;
