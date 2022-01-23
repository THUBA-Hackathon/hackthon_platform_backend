// 页面顶部栏
import React from "react";
import '../App.css';
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
import { AuthClient } from "@dfinity/auth-client";
import { createActor, canisterId } from "../../../declarations/hackthon_platform"
import UserContext from "../context/user-context";
import { useNavigate } from "react-router-dom";


const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);


export default function Nav (props) {
    
    let navigate = useNavigate();
    // constructor(props) {
    //     super(props)
    // }
    // static contextType = UserContext;
    
    // render ()  {
        const {user, setUser} = props.props;
        async function handleAuthenticated(authClient, context) {
            // Create an actor to interact with the NNS Canister
            // we pass the NNS Canister id and the interface factory
            const identity = await authClient.getIdentity();
            const backendActor = await createActor(canisterId,{
                agentOptions: {
                    identity,
                },
            });
            console.log("backendActor:", backendActor);
            
            setUser({
                backendActor: backendActor,
                principal: identity.getPrincipal(),
                userInfo: user.userInfo,
            });
        }

        const handleLogInClick = async () => {
            const authClient = await AuthClient.create();
            if (await authClient.isAuthenticated()) {
                handleAuthenticated(authClient);
            }
            authClient.login({
                onSuccess: async () => {
                    // authClient now has an identity
                    handleAuthenticated(authClient);
                },
                identityProvider: process.env.DFX_NETWORK === "ic"
                  ? "https://identity.ic0.app/#authorize"
                  : process.env.LOCAL_II_CANISTER,
                // Maximum authorization expiration is 8 days
                maxTimeToLive: days * hours * nanoseconds,
            });
        }
    
        const handleOnClickMine = (() => {
            navigate("/mine");
            // history.push('/#/mine')
            // window.location.reload()
        })
        const handleOnClickHome = (() => {
            navigate("/")
            // window.location.reload()
        })
        let logIn;
        console.log(user);
        if (user.principal != null) {
            logIn = <div className="nav_address" onClick={handleLogInClick}>{user.principal.toString().substring(0, 5) + "-*"}</div>;
        } else {
            logIn = <div className="nav_address" onClick={handleLogInClick}>log in</div>
        }
    
        return (
            <div className="nav">
                <img className="nav_logo_img" src="logo.png" alt="" onClick={handleOnClickHome} />
                <div className="nav_logo" onClick={handleOnClickHome}>Hacker Valley</div>
                <div className="nav_hackathon" onClick={handleOnClickHome}>黑客松</div>
                {/* <div className="nav_projects">项目展示</div> */}
                <div className="nav_search"></div> {/* 搜索框 */}
                {logIn}
                <img className="nav_img_mine" src="icon_mine.png" alt="" />
                <div className="nav_mine" onClick={handleOnClickMine}>我的</div>{/* 跳转到账户管理 */}
            </div>
        );
    // }
}


