import React, { createContext, useCallback, useEffect, useState } from 'react'
import { AuthClient } from "@dfinity/auth-client";
import { createActor, canisterId } from "../../../declarations/hackthon_platform"

const UserContext = createContext(null);

export const useUser = () => React.useContext(UserContext);


const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        principal: null,
        backendActor: null,
        userInfo: null,
    });
    const [authClient, setAuthClient] = useState()
    const [loading, setLoading] = React.useState(false);

    const handleAuthenticated = useCallback(async (authClient) => {
        const identity = await authClient.getIdentity();
        const backendActor = await createActor(canisterId, {
            agentOptions: {
                identity,
            },
        });

        var user_info = await backendActor.getSelfUserInfo();
        console.log("get user info from backend: ", user_info);

        setUser({
            backendActor: backendActor,
            principal: identity.getPrincipal(),
            userInfo: user_info,
        });
        console.log(identity.getPrincipal().toString())
        setLoading(false)
    }, [canisterId, createActor])

    const connect = useCallback(async () => {
        const authClient = await AuthClient.create();
        setAuthClient(authClient)
        setLoading(true)
        if (await authClient.isAuthenticated()) {
            handleAuthenticated(authClient);
            return
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
    }, [canisterId, createActor])

    const logout = useCallback(async () => {
        await authClient.logout()
        setUser({
            backendActor: null,
            principal: null,
            userInfo: null,
        });
    }, [authClient])

    useEffect(() => {
        const identity = window.localStorage.getItem("ic-delegation")
        if (identity) {
            connect()
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, connect, logout, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;