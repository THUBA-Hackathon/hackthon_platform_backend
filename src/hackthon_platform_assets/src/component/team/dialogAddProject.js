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
const history = createBrowserHistory()

export default function AddProjectDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [intro, setIntro] = React.useState('');
  const [slogan, setSlogan] = React.useState('');
  const [stack, setStack] = React.useState('');
  


  const handleClickOpen = async () => {
    // setOpen(true);
    //检查用户是否填写过个人信息，没有的话先填写个人信息,个人信息也存入localstorage
    var usr_addr = localStorage.getItem('id');
    console.log(typeof(usr_addr))
    try{
      var userInfo = await hackthon_platform.getUserInfo({id : usr_addr});
    } catch(e) {
      alert('Please fill your info first!')
      history.push('/#/mine/')
      window.location.reload()
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
      // 提交表单
    console.log('submit1');
    var uuid = "teamid" + guid();
    var hackathon_id = props.hackathonId;
    var stack_list = stack.split(" ");
    console.log(name + intro + stack)
    // const add_hackthon = await hackthon_platform.createHacktahon(Principal.fromText("f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe"),{id : uuid, name : name, startdate: start_date, sponsor :  sponsor, enddate : end_date, intro : intro, teams: []});
    await hackthon_platform.createTeam({id : uuid, name : name, intro: intro, members: ['this user'], skills_needed:stack_list, hackathon_id:hackathon_id, video_link:'', code_link:''});
    // console.log(name + sponsor + intro + start_date + end_date)
    console.log('submit2');
    setOpen(false);
    var list_team = await hackthon_platform.getTeamList(hackathon_id);
    props.setTeamList(list_team);
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
            onChange={(introValue) => {setIntro(introValue.target.value)}}
          />
          <TextField
            margin="dense"
            id="techstack"
            label="所需技术栈"
            variant="outlined"
            fullWidth
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