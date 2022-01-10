// 页面顶部栏
import React from "react";
import '../App.css';
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
import { AuthClient } from "@dfinity/auth-client";
import { createActor, canisterId } from "../../../declarations/hackthon_platform"
import UserContext from "../context/user-context";



const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);


export default class Nav extends React.Component {
    static contextType = UserContext;
    
    render ()  {
        const {user, setUser} = this.context;
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
            let testlist = await backendActor.getHackathonList()
            console.log(testlist)
            
            // localStorage.setItem("id", identity.getPrincipal().toString());
            // const [user, setUser] = context
            
            setUser({
                backendActor: backendActor,
                principal: identity.getPrincipal()
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
    
        const handleOnClick = (() => {
            history.push('/#/mine')
            window.location.reload()
        })
        const handleOnClick1 = (() => {
            history.push('/#/')
            window.location.reload()
        })
        let logIn;
        console.log(user)
        if (user.identity != null) {
            logIn = <div className="nav_address" onClick={handleLogInClick}>{user.principal.toString().substring(0, 5) + "-*"}</div>;
        } else {
            logIn = <div className="nav_address" onClick={handleLogInClick}>log in</div>
        }
    
        return (
            <div className="nav">
                <img className="nav_logo_img" src="logo.png" alt="" onClick={handleOnClick1} />
                <div className="nav_logo" onClick={handleOnClick1}>Hacker Valley</div>
                <div className="nav_hackathon" onClick={handleOnClick1}>黑客松</div>
                {/* <div className="nav_projects">项目展示</div> */}
                <div className="nav_search"></div> {/* 搜索框 */}
                {logIn}
                <img className="nav_img_mine" src="icon_mine.png" alt="" />
                <div className="nav_mine" onClick={handleOnClick}>我的</div>{/* 跳转到账户管理 */}
            </div>
        );
    }
}


