// 黑客松列表, 对应设计稿01页的黑客松列表
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { bgColorShallow, mainIndigoColor, mainWidth, textColor } from "../../style"
import moment from "moment"
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import { useLoading, useSwitch } from "../Loading"
import { DataStateBox } from "../DataStateBox"

export const Time = (props) => {
    const { startdate, enddate, css } = props;
    const [time, setTime] = useState(0)
    const end = moment(enddate).valueOf();
    //const end = moment("2022-05-18").valueOf();
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
            return `Time: ${moment(startdate).format("yyyy/MM/DD")}-${moment(enddate).format("yyyy/MM/DD")} UTC+8`
        } else {
            const day = Math.floor(time / d);
            const hour = Math.floor((time - day * d) / h);
            const minute = Math.floor((time - day * d - hour * h) / m);
            const scend = time - day * d - hour * h - minute * m;
            const str = day > 0 ? day + "天" : ""

            return `Ongoing: ${(day > 0 ? day + "天" : "") + (hour > 0 ? hour + "时" : "") + (minute > 0 ? minute + "分" : "") + scend + "秒"}`
        }
    }, [time, startdate, end])

    return (
        <div style={{
            marginBottom: "20px",
            ...css,
            color: time > 0 ? mainIndigoColor : "#666666"
        }}>{timeStr}</div>
    )
}

const HackathonBrief = (props) => {
    const { name, sponsor, intro } = props;

    return (
        <div
            style={{
                width: "90%",
                fontFamily: "DQHT",
                fontStyle: "normal",
                fontSize: "20px",
                color: "#666666",
            }}
        >
            <div style={{
                fontWeight: 700,
                fontSize: "35px",
                lineFeight: "50px",
                marginBottom: "40px",
                color: textColor,
            }}>{name}</div>
            <div style={{ marginBottom: "10px", }}>Prize: {sponsor}</div>
            <Time {...props} />
            <p className="ellipsis3" style={{ marginTop: 20, color: textColor, fontSize: 14, maxHeight: 64, overflow: "hidden" }}>{intro}</p>
        </div>
    )
}

const HackathonInfo = (props) => {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate('/details/' + (props.id))
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ height: 20, background: bgColorShallow, margin: "20px auto" }}></div>
            <div className="flex-between" style={{ width: mainWidth, margin: "auto" }}>
                <div style={{ flex: 2 }}>
                    <img className="hackathon_img" src={props.url} alt="" style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="flex-between" style={{ flex: 3, paddingLeft: 50 }}>
                    <HackathonBrief id={props.id} name={props.name} sponsor={props.sponsor} startdate={props.startdate} enddate={props.enddate} intro={props?.intro} />
                    <img style={{ width: 50, cursor: "pointer", }} src="arrow.svg" alt="" onClick={handleClick} />
                </div>
            </div>
        </div>
    );
}

// 每个HackathonInfo传入的参数包括黑客松的图片url,名称name,主办方sponsor,开始日期startdate和结束日期enddate,格式为上方list的格式
const HackathonList = () => {
    const [hackathonList, setHackathon_list] = useState([])
    const { isOpen, open, close } = useSwitch()

    const getHackathonList = useCallback(async () => {
        open()
        var list_hackathon = await hackthon_platform.getHackathonList();
        setHackathon_list(list_hackathon);
        close()
    }, [])

    useEffect(() => {
        getHackathonList()
    }, [])

    return (
        <DataStateBox notNeedUser data={hackathonList} loading={isOpen} emptyDesc="No Hackathon Data" SkeletonCSS={{ width: mainWidth }}>
            {hackathonList.map((item, index) => {
                return (<HackathonInfo key={index} {...item} url="example-hackathon.png" />)
            })}
        </DataStateBox>
    )
}

export default HackathonList;
