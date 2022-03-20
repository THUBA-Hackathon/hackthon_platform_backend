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
  const [video_link, setVideoLink] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const { user, setUser } = props.props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
      // 提交表单
      if(user != null && user.userInfo != null && user.userInfo.name == props.capName) {
        user.backendActor.submit(props.teamId, code_link, video_link);
        props.setCodeLink(code_link);
        props.setVideoLink(video_link)
        setOpen(false);
      }
      else {
        alert("身份非法，请检查是否已登陆且为此队伍队长")
      }
  };

  return (
    <div>
        <div className='join_team_button' onClick={handleClickOpen}>
            <div className="join_btn">提交项目</div>
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
            value={video_link}
            fullWidth
            variant="outlined"
            onChange={(videoLink) => { setVideoLink(videoLink.target.value) }}
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