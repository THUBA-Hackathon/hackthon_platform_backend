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
        {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>个人信息</DialogTitle>
        <DialogContent>
          
        <TextField
                margin="dense"
                id="name"
                label="昵称"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(nameValue) => {setName(nameValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="area"
                label="来自国家/地区"
                fullWidth
                variant="outlined"
                value={area}
                onChange={(areaValue) => {setArea(areaValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="school"
                label="学校"
                fullWidth
                variant="outlined"
                value={school}
                onChange={(schoolValue) => {setSchool(schoolValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="phone"
                label="手机"
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(phoneValue) => {setPhone(phoneValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="email"
                label="邮箱"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(emailValue) => {setEmail(emailValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="role_wanted"
                label="希望担任的角色"
                fullWidth
                variant="outlined"
                multiline
                value={skills}
                onChange={(skillsValue) => {setSkills(skillsValue.target.value)}}
            />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleClose}>提交</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}