// 加入队伍，填写个人信息
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './team.css'
import { useNavigate } from "react-router-dom";

export default function JoinTeamDialog(props) {
  const [open, setOpen] = React.useState(false);
  const {user, setUser} = props.props

  let navigate = useNavigate()

  const handleClickJoin = async () => {
    if (!user.userInfo) {
      if (!user.backendActor) {
        alert('Please connect wallet!');
        navigate('/');
        return;
      } else {
        console.log(user.backendActor);
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
    user.backendActor.joinTeam(props.teamId)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // 提交表单
    setOpen(false);
  };

  return (
    <div>
        <div className='join_team_button' onClick={handleClickJoin}>
            <div className="join_btn">我要报名</div>
        </div>
    </div>
  );
}