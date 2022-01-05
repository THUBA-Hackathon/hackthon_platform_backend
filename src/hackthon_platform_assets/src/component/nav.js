// 页面顶部栏
import React from "react";
import '../App.css';
import { createBrowserHistory } from 'history'
const history = createBrowserHistory()
import { AuthClient } from "@dfinity/auth-client";
import { createActor, canisterId } from "../../../declarations/hackthon_platform"

async function handleAuthenticated(authClient) {
    // const {user, setUser} = this.context;
    // Create an actor to interact with the NNS Canister
    // we pass the NNS Canister id and the interface factory
    const backendActor = await createActor({
        canisterId,
        agentOptions: {
            identity,
        },
    });
    console.log("backendActor:", backendActor);
    const identity = await authClient.getIdentity();
    localStorage.setItem("id", identity.getPrincipal().toString());
    setUser((prevUser) => ({
        ...prevUser,
        backendActor: backendActor,
        identity: identity
    }));
}

const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

export default function Nav() {
    // class Nav extends React.Component{
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
            identityProvider:"https://identity.ic0.app/#authorize",
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
    if (localStorage.getItem('id')) {
        logIn = <div className="nav_address" onClick={handleLogInClick}>{localStorage.getItem('id').substring(0, 5) + "-*"}</div>;
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

