// 队长信息展示
import React from "react";
import { mainWidth } from "../../style";
import Skeleton from '@mui/material/Skeleton';

// 传入的参数包括队伍名称，队长昵称，队长email
const Captain = (props) => {
    const width = props?.width || (mainWidth - 200)
    return (
        <div className="flex-y-center" style={{ width: width, ...props?.css }}>
            <img src="avater.png" alt="" style={{width: 80 }}/>
            <div style={{
                marginLeft: 20,
                fontFamily: 'Helvetica',
                fontStyle: "normal",
                color: "#0E1735",
                width: width - 180,
                fontSize: 16,
            }}>
                {props.team_name && <div className="ellipsis flex-y-center" style={{
                    fontSize: 20,
                    marginBottom: 15,
                    fontWeight: 700
                }}>{props?.team_name || <Skeleton variant="text" height={30} width={400}/>}</div>}
                <div className="flex-y-center" style={{
                    marginBottom: 10,
                }}>Leader: {props?.name || <Skeleton variant="text" height={30} width={400}/>}</div>
                <div className="flex-y-center">Email: {props?.email || <Skeleton variant="text" height={30} width={400}/>}</div>
            </div>
        </div>
    );
}

export default Captain;
