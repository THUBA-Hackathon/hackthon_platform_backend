import React, { useEffect, useState } from "react";
import { useUser } from "../context/user-context";
import { mainColor } from "../style";
import { uint8ArrayToBase64 } from "./handleImg"
import { useSmallLoading, useSwitch } from "./Loading";
import Skeleton from '@mui/material/Skeleton';


export const LoadImage = (props) => {
    const [url, setUrl] = useState("")
    const [src, setSrc] = useState("")
    const { isOpen, open, close } = useSwitch()
    const { user } = useUser()

    useEffect(async () => {
        if (!user.backendActorPictureBed || !props?.src) return
        open()
        let url = ''
        /* if (props?.src?.includes("http")) {
            url = props?.src;
        } else { */
        var test00 = await user.backendActorPictureBed.getImg(props?.src)
        if (!test00?.ok[0]) return
        url = uint8ArrayToBase64(test00?.ok[0]);
        //}

        setUrl(url);
    }, [props.src, user.backendActorPictureBed])

    useEffect(() => {
        if (!url) return
        let image = new Image();
        image.src = url;
        image.onload = () => {
            setSrc(url)
            close()
        }
    }, [url])

    return (isOpen ? <Skeleton sx={{ ...(props.SkeletonCSS || {}) }} animation="wave" variant="rectangular" /> : <img src={src} style={{ ...(props.css || {}) }} />)
}