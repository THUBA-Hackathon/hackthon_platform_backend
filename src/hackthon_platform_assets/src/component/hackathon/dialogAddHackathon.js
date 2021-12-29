// 添加黑客松对话框
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddHackathon from './addHackathon';
import moment from 'moment';
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import { Principal } from '@dfinity/principal';

export default function AddDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [sponsor, setSponsor] = React.useState('');
  const [intro, setIntro] = React.useState('');
  const [start_date, setStartDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [end_date, setEndDate] = React.useState(moment().format('YYYY-MM-DD'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCommit = async () => {
      // 提交表单
    console.log('submit1');
    var uuid = "hackathonid"+guid();
    // const add_hackthon = await hackthon_platform.createHacktahon(Principal.fromText("f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe"),{id : uuid, name : name, startdate: start_date, sponsor :  sponsor, enddate : end_date, intro : intro, teams: []});
    const add_hackthon = await hackthon_platform.createHackathon({id : uuid, name : name, startdate: start_date, sponsor :  sponsor, enddate : end_date, intro : intro, teams: []});
    // console.log(name + sponsor + intro + start_date + end_date)
    console.log('submit2');
    setOpen(false);
  };
  const handleClose = async () => {
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
        <div className='add_button' onClick={handleClickOpen}>
            <AddHackathon/>
        </div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>发起黑客松</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            margin="dense"
            id="name"
            label="名称"
            fullWidth
            variant="outlined"
            // onChange={handleNameChange}
            onChange={(nameValue) => {setName(nameValue.target.value)}}
          />
          <TextField
            margin="dense"
            id="sponsor"
            label="主办方"
            fullWidth
            variant="outlined"
            onChange={(sponsorValue) => {setSponsor(sponsorValue.target.value)}}
          />
          <TextField
            margin="dense"
            id="intro"
            label="赛事介绍"
            fullWidth
            variant="outlined"
            multiline
            onChange={(introValue) => {setIntro(introValue.target.value)}}
          />
          <TextField
            margin="dense"
            id="start_date"
            label="开始时间"
            type="date"
            variant="outlined"
            fullWidth
            defaultValue={moment().format('YYYY-MM-DD')}
            onChange={(startDateValue) => {setStartDate(startDateValue.target.value)}}
          />
          <TextField
            margin="dense"
            id="end_date"
            label="结束时间"
            type="date"
            variant="outlined"
            fullWidth
            defaultValue={moment().format('YYYY-MM-DD')}
            onChange={(endDateValue) => {setEndDate(endDateValue.target.value)}}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleCommit}>提交</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}