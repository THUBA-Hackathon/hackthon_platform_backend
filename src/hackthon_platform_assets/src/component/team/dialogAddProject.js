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
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import { createBrowserHistory } from 'history'
import { useNavigate } from "react-router-dom";
const history = createBrowserHistory()

export default function AddProjectDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [intro, setIntro] = React.useState('');
  const [slogan, setSlogan] = React.useState('');
  const [stack, setStack] = React.useState('');
  const { user, setUser } = props.props;
  
  let navigate = useNavigate()


  const handleClickOpen = async () => {
    // setOpen(true);
    //检查用户是否填写过个人信息，没有的话先填写个人信息,个人信息也存入localstorage
    if (user.backendActor == null) {
      alert('请您连接钱包!')
      console.log(user)
    }
    else if (user.userInfo.name == '') {
      alert('请您填写个人信息!')
      navigate('/mine')
    }
    else
    setOpen(true);
  };

  const handleSubmit = async () => {
    // 提交表单
    if(name == '' || intro == '' || stack == '') {
      alert('字段填写不完整！')
      return;
    }
    var uuid = "teamid" + guid();
    var hackathon_id = props.hackathonId;
    var stack_list = stack.split(" ");
    console.log(name + intro + stack)
    await user.backendActor.createTeam({id : uuid, name : name, intro: intro, members: [], skills_needed:stack_list, hackathon_id:hackathon_id, video_link:'', code_link:''});
    
    var list_team = await hackthon_platform.getTeamList(hackathon_id);
    props.setTeamList(list_team);

    alert('创建队伍成功！');
    setName('');
    setIntro('');
    setStack('');

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  //用于生成uuid
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  function guid() {
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  return (
    <div>
        <div className='team_add_button' onClick={handleClickOpen}>
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
            defaultValue={name}
            onChange={(nameValue) => {setName(nameValue.target.value)}}
          />
          {/* <TextField
            margin="dense"
            id="slogan"
            label="队伍口号"
            fullWidth
            variant="outlined"
            onChange={(sloganValue) => {setSlogan(sloganValue.target.value)}}
          /> */}
          <TextField
            margin="dense"
            id="intro"
            label="项目介绍"
            fullWidth
            variant="outlined"
            multiline
            defaultValue={intro}
            onChange={(introValue) => {setIntro(introValue.target.value)}}
          />
          <TextField
            margin="dense"
            id="techstack"
            label="所需技术栈 空格分隔"
            variant="outlined"
            fullWidth
            defaultValue={stack}
            onChange={(stackValue) => {setStack(stackValue.target.value)}}
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