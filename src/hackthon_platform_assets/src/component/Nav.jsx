// 页面顶部栏
import React from "react";
import '../App.css';
import { useUser } from "../context/user-context";
import { useNavigate } from "react-router-dom";
import { mainColor, mainWidth, textColor } from "../style";
import { useMessage, useSmallLoading, useSwitch } from "./Loading"

export default function Nav() {
    const { user, connect, loading, logout } = useUser()
    const { SmallLoading, smallLoading, setSmallLoading } = useSmallLoading()
    const { isOpen, open, close } = useSwitch();
    let navigate = useNavigate();
    const { Message, message } = useMessage()

    React.useEffect(() => {
        setSmallLoading(loading)
    }, [loading])

    const handleOnClickMine = (() => {
        if (user.principal !== null) {
            navigate("/mine");
        } else {
            message("warning", "Please log in")
        }
        // history.push('/#/mine')
        // window.location.reload()
    })
    const handleOnClickHome = (() => {
        navigate("/")
        // window.location.reload()
    })

    return (
        <div className="flex-between"
            style={{
                boxShadow: "0px 5px 10px #f2f2f2",
                position: "fixed",
                top: 0,
                background: "white",
                zIndex: 100,
                width: "100vw",
                minWidth: mainWidth,
                padding: "0 50px",
                height: 70
            }}>
            <Message />
            <div className="flex-y-center" style={{ cursor: "pointer", }} onClick={handleOnClickHome}>
                <div><img style={{ height: 50 }} src="logo.jpg" alt="" /></div>
                <div
                    style={{
                        fontFamily: 'Quantico',
                        fontStyle: "normal",
                        fontWeight: 700,
                        marginLeft: 20,
                        color: "#2D2E36",
                        fontSize: 24
                    }}
                >
                    Hacker Valley
                </div>
            </div>
            {/* <div className="nav_hackathon" onClick={handleOnClickHome}>黑客松</div> */}
            {/* <div className="nav_projects">项目展示</div> */}
            {/* <div className="nav_search"></div> */}
            <div className="flex-y-center">
                <div className="flex-center"
                    style={{
                        cursor: (smallLoading || user.principal) ? "default" : "pointer",
                        padding: "9px 30px",
                        width: 150,
                        height: 40,
                        border: "1px solid #C4C4C4",
                        borderRadius: "10px",
                        fontWeight: 700,
                        position: "relative"
                    }} onClick={() => {
                        if (!smallLoading && !user.principal) {
                            connect()
                            close()
                        }
                    }}
                    onMouseEnter={open}
                    onMouseLeave={close}
                >
                    {user.principal !== null
                        ? user.principal.toString().substring(0, 5) + "-*"
                        : (smallLoading ? <SmallLoading size={20} /> : "log in")}
                    {isOpen && user.principal !== null && <div className="flex-center" style={{
                        position: "absolute",
                        top: 36,
                        left: 0,
                        width: 150,
                        height: 40,
                        borderRadius: "10px",
                        background: "white",
                        boxShadow: "0px 2px 3px rgba(0,0,0,0.7)",
                        cursor: "pointer",
                    }}
                        onClick={(e) => {
                            e.stopPropagation();
                            logout()
                        }}
                    >log out</div>}
                </div>

                <>
                    <img style={{ height: 30, marginLeft: 40 }} src="person.jpg" alt="" />
                    <div
                        style={{
                            color: user.principal ? mainColor : textColor,
                            cursor: "pointer"
                        }}
                        onClick={handleOnClickMine}
                    >Mine</div>
                </>
            </div>
        </div >
    );
}


