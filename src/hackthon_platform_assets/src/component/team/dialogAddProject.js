// 添加项目对话框
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddTeam from './newTeam';
import moment from 'moment'
import './team.css'

export default function AddProjectDialog() {
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
        <div className='add_button' onClick={handleClickOpen}>
            <AddTeam />
        </div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>项目信息</DialogTitle>
        <DialogContent>
          
          <TextField
            margin="dense"
            id="name"
            label="队伍名称"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="slogan"
            label="队伍口号"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="intro"
            label="项目介绍"
            fullWidth
            variant="outlined"
            multiline
          />
          <TextField
            margin="dense"
            id="techstack"
            label="所需技术栈"
            variant="outlined"
            fullWidth
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