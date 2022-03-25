// 加入队伍，填写个人信息
import * as React from 'react';
import { useUser } from '../../context/user-context';
import { useSmallLoading, useMessage, useSwitch } from "../Loading"
import SubmitCodeDialog from './dialogSubmitCode';
import Backdrop from '@mui/material/Backdrop';
import { AccountInfoCore } from '../mine/accountInfo';

export default function JoinTeamDialog(props) {
  const { teamId, getTeams, teamInfo } = props;
  const { user, connect } = useUser();
  const { Message, message } = useMessage()
  const { SmallLoading, smallLoading, setSmallLoading } = useSmallLoading()
  const { isOpen, close, open } = useSwitch();
  const { isOpen: isOpenAccount, open: openAccount, close: closeAccount } = useSwitch();

  const { isMember, isCaptain, isJoinIn } = React.useMemo(() => {
    let isMember, isCaptain;
    const members = props?.teamInfo?.members
    if (members?.length > 0) {
      isCaptain = (members[0]?.id || members[0]) === user?.userInfo?.id;
      isMember = !!members?.find(item => (item?.id || item) === user?.userInfo?.id)
    }
    return {
      isMember,
      isCaptain,
      isJoinIn: !isCaptain
    }
  }, [props?.teamInfo?.members, user?.userInfo])

  const handleClickJoin = async () => {

    if (!user.backendActor) {
      message("warning", "Please login!");
      connect()
    }
    else if (!user?.userInfo?.name) {
      message("warning", "Please add your personal information!");
      openAccount()
    }
    else {
      //if (props?.members?.find(item => item?.id !== user?.userInfo?.id)) {
      if (isJoinIn) {
        setSmallLoading(true)
        try {
          await user.backendActor.joinTeam(teamId);
          message("success", "Successful submission of application, please wait for team leader review!");
          setSmallLoading(false)
          getTeams && getTeams()
        }
        catch (e) {
          //console.log(e)
          message("warning", "Team entry application failed to submit!");
          setSmallLoading(false)
        }
      } else {
        open()
      }
    }
  };

  if(isMember && !isCaptain){
    return null
  }

  return (
    <div>
      <Message />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpenAccount}
      >
        <AccountInfoCore onCancel={closeAccount} css={{ width: 600, background: "white", maxHeight: "90vh" }} />
      </Backdrop>
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
        }}>{isJoinIn ? "Join in" : "Submit"}</div>}
      </div>
      <SubmitCodeDialog isOpen={isOpen} close={close} getTeams={getTeams} teamInfo={teamInfo} />
    </div>
  );
}