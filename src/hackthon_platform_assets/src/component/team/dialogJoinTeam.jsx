// 加入队伍，填写个人信息
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/user-context';
import { useSmallLoading, useMessage } from "../Loading"

export default function JoinTeamDialog(props) {
  const { user, setUser, connect } = useUser();
  const { Message, message } = useMessage()
  const { SmallLoading, smallLoading, setSmallLoading } = useSmallLoading()

  let navigate = useNavigate()

  const handleClickJoin = async () => {

    if (!user.backendActor) {
      message("warning", "请您连接钱包!");
      connect()
      return;
    }
    else if (user.userInfo.name == '') {
      message("warning", "请填写个人信息后再加入队伍!");
      navigate('/mine');
      return;
    }
    else {
      if (!user.backendActor) {
        var user_info = await user.backendActor.getSelfUserInfo();
        console.log("get user info from backend: ", user_info);
        console.log(user_info.name)

        setUser({
          backendActor: user.backendActor,
          principal: user.principal,
          userInfo: user_info,
        });
      }
    }

    try {
      setSmallLoading(true)
      await user.backendActor.joinTeam(props.teamId);
      message("success", "成功提交申请，请等待队长审核!");
      setSmallLoading(false)
    }
    catch (e) {
      message("warning", "入队申请提交失败!");
      setSmallLoading(false)
    }
  };


  return (
    <div>
      <Message />
      <div className='flex-center' onClick={handleClickJoin} style={{
        width: "150px",
        height: "50px",
        background: "#06E1FF",
        borderRadius: "15px",
        cursor: "pointer",
        textAlign: "center",
      }}>
        {smallLoading ? <SmallLoading size={30} color="white" /> : <div style={{
          fontFamily: "DQHT Helvetica",
          fontWeight: "bold",
          fontSize: "20px",
          color: "#FFFFFF"
        }}>join in</div>}
      </div>
    </div>
  );
}