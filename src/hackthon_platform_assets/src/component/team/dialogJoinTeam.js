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
var usr_addr = localStorage.getItem('id');

export default function JoinTeamDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('')
  const [area, setArea] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [skills, setSkills] = React.useState('')
  const [school, setSchool] = React.useState('')

  let navigate = useNavigate()

  const handleClickOpen = async () => {
    var usr_addr = localStorage.getItem('id');
    try{
      var userInfo = await hackthon_platform.getUserInfo({id : usr_addr});
    } catch(e) {
      alert('Please fill your info first!')
      navigate('/mine/')
    }
    setOpen(true);
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
        <div className='join_team_button' onClick={handleClickOpen}>
            <div className="join_btn">我要报名</div>
        </div>
        <Dialog open={open} onClose={handleClose}>
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
      </Dialog>
    </div>
  );
}