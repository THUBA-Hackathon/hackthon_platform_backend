import React, { useEffect, useState } from "react";
import { uint8ArrayToBase64 } from "./handleImg"
import { useSwitch } from "./Loading";
import Skeleton from '@mui/material/Skeleton';
import { pictureBed } from "../../../declarations/picture_bed";

export const LoadImage = (props) => {
    const [url, setUrl] = useState("")
    const [src, setSrc] = useState("")
    const { isOpen, open, close } = useSwitch()

    useEffect(async () => {
        if (!pictureBed || !props?.src) return
        open()
        let url = ''
        /* if (props?.src?.includes("http")) {
            url = props?.src;
        } else { */
        var test00 = await pictureBed.getImg(props?.src)
        if (!test00?.ok[0]) return
        url = uint8ArrayToBase64(test00?.ok[0]);
        //}

        setUrl(url);
    }, [props.src, pictureBed])

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