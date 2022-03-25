// 黑客松列表, 对应设计稿01页的黑客松列表
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { bgColorShallow, mainIndigoColor, mainWidth, textColor } from "../../style"
import moment from "moment"
import { LoadImage } from "../Image"

export const Time = (props) => {
    const { startdate, enddate, css } = props;
    const current = new Date().getTime()
    const end = moment(enddate).valueOf();
    const diff = parseInt((end - current) / 1000);
    const [time, setTime] = useState(diff)
    // const end = moment("2022-03-22 21:23:50").valueOf();
    const m = 60;
    const h = m * 60;
    const d = 24 * h;

    useEffect(() => {
        let timer = setInterval(() => {
            const current = new Date().getTime()
            const diff = parseInt((end - current) / 1000);
            setTime(diff)
            if (diff <= 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [end])

    const timeStr = useMemo(() => {
        if (time <= 0) {
            return `Ended: ${moment(startdate).format("yyyy/MM/DD")}-${moment(enddate).format("yyyy/MM/DD HH:mm")} UTC+8`
        } else {
            const day = Math.floor(time / d);
            const hour = Math.floor((time - day * d) / h);
            const minute = Math.floor((time - day * d - hour * h) / m);
            const scend = time - day * d - hour * h - minute * m;

            return `Ongoing: ${(day > 0 ? day + "天" : "") + (hour > 0 ? hour + "时" : "") + (minute > 0 ? minute + "分" : "") + scend + "秒"}`
        }
    }, [time, startdate, end])

    return (
        <div style={{
            ...css,
            color: time <= 0 ? "#666666" : mainIndigoColor
        }}>{timeStr}</div>
    )
}

const HackathonBrief = (props) => {
    const { name, sponsor } = props;

    return (
        <div
            style={{
                width: "calc(100% - 60px)",
                height: 230,
                fontFamily: 'Poppins',
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "20px",
                color: "#939393",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            <div className="ellipsis2" style={{
                fontWeight: 700,
                fontSize: "30px",
                color: textColor,
                marginTop: 15
            }}>{name?.length > 80 ? name?.slice(0, 80) + "..." : name}</div>
            <div style={{ marginBottom: 15 }}>
                <div style={{ marginBottom: "5px", color: "#0057FE" }}>Bonus: {sponsor}</div>
                <Time {...props} />
            </div>
            {/* <p className="ellipsis3" style={{ marginTop: 20, color: textColor, fontSize: 14, overflow: "hidden", maxHeight: 100 }} dangerouslySetInnerHTML={{ __html: intro }}></p>
             */}
            {/* <div style={{ width: mainWidth, margin: "auto", fontSize: 16 }} dangerouslySetInnerHTML={{ __html: hackathon.intro }}></div> */}
        </div>
    )
}

export const HackathonInfo = (props) => {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate('/details/' + (props.id))
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ height: 20, background: bgColorShallow, margin: "20px auto" }}></div>
            <div className="flex-y-center" style={{ width: mainWidth, margin: "auto" }}>
                <LoadImage src={props.image_id} css={{ width: 500, height: 240 }} SkeletonCSS={{ width: 500, height: 240 }} />
                <div className="flex-between" style={{ marginLeft: 60, width: "calc(100% - 560px)" }}>
                    <HackathonBrief id={props.id} name={props.name} sponsor={props.sponsor} startdate={props.startdate} enddate={props.enddate} intro={props?.intro} />
                    <img style={{ width: 50, cursor: "pointer", }} src="arrow.svg" alt="" onClick={handleClick} />
                </div>
            </div>
        </div>
    );
}
