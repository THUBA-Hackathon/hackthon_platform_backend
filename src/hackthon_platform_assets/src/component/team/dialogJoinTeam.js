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

export default function JoinTeamDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
          />
          <TextField
            margin="dense"
            id="area"
            label="来自国家/地区"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="phone"
            label="手机"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="email"
            label="邮箱"
            variant="outlined"
            fullWidth
            type="email"
          />
          <TextField
            margin="dense"
            id="role_wanted"
            label="希望担任的角色"
            fullWidth
            variant="outlined"
            multiline
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