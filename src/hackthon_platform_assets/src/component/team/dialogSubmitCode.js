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
import UserContext from '../../context/user-context';

export default function SubmitCodeDialog(props) {
  const [code_link, setCodeLink] = React.useState('')
  const [demo_link, setDemoLink] = React.useState('')
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
      // 提交表单
    const {user, setUser} = props.props;
    user.backendActor.submit(props.teamId, code_link, demo_link)
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
            value={code_link}
            fullWidth
            variant="outlined"
            onChange={(codeLink) => { setCodeLink(codeLink.target.value) }}
          />
          <TextField
            margin="dense"
            id="video"
            label="演示视频"
            value={demo_link}
            fullWidth
            variant="outlined"
            onChange={(demoLink) => { setDemoLink(demoLink.target.value) }}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit}>提交</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}