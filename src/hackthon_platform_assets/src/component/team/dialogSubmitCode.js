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

export default function SubmitCodeDialog() {
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
        <div className='submit_btn' onClick={handleClickOpen}>
            提交项目
        </div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>代码提交</DialogTitle>
        <DialogContent>
          
          <TextField
            margin="dense"
            id="link"
            label="代码链接"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="video"
            label="演示视频"
            fullWidth
            variant="outlined"
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