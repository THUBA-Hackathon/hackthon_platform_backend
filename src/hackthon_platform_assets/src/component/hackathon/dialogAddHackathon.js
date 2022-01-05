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
import UserContext from '../../context/user-context';
import { hackthon_platform } from '../../../../declarations/hackthon_platform/index';

export default function AddDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [sponsor, setSponsor] = React.useState('');
  const [intro, setIntro] = React.useState('');
  const [start_date, setStartDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [end_date, setEndDate] = React.useState(moment().format('YYYY-MM-DD'));
  // const contextType = UserContext;
  const { user, setUser } = props.props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCommit = async () => {
    // 提交表单
    var uuid = "hackathonid" + guid();
    console.log(props)
    const hackathon_actor = props.props.user.backendActor;
    console.log(hackathon_actor)
    console.log(hackthon_platform)
    const list2 = await hackthon_platform.getHackathonList()
    console.log(list2)
    const list = await hackathon_actor.getHackathonList()
    console.log(list)
    // const add_hackthon = await hackthon_platform.createHacktahon(Principal.fromText("f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe"),{id : uuid, name : name, startdate: start_date, sponsor :  sponsor, enddate : end_date, intro : intro, teams: []});
    const add_hackthon = await hackathon_actor.createHackathon({ id: uuid, name: name, startdate: start_date, sponsor: sponsor, enddate: end_date, intro: intro, teams: [] });
    // console.log(name + sponsor + intro + start_date + end_date)
    setOpen(false);
  };
  const handleClose = async () => {
    setOpen(false);
  };
  //用于生成uuid
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }


  return (
    <div>
      <div className='add_button' onClick={handleClickOpen}>
        <AddHackathon />
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
            onChange={(nameValue) => { setName(nameValue.target.value) }}
          />
          <TextField
            margin="dense"
            id="sponsor"
            label="主办方"
            fullWidth
            variant="outlined"
            onChange={(sponsorValue) => { setSponsor(sponsorValue.target.value) }}
          />
          <TextField
            margin="dense"
            id="intro"
            label="赛事介绍"
            fullWidth
            variant="outlined"
            multiline
            onChange={(introValue) => { setIntro(introValue.target.value) }}
          />
          <TextField
            margin="dense"
            id="start_date"
            label="开始时间"
            type="date"
            variant="outlined"
            fullWidth
            defaultValue={moment().format('YYYY-MM-DD')}
            onChange={(startDateValue) => { setStartDate(startDateValue.target.value) }}
          />
          <TextField
            margin="dense"
            id="end_date"
            label="结束时间"
            type="date"
            variant="outlined"
            fullWidth
            defaultValue={moment().format('YYYY-MM-DD')}
            onChange={(endDateValue) => { setEndDate(endDateValue.target.value) }}
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


// {
//   "canisterId": "rrkah-fqaaa-aaaaa-aaaaq-cai",
//     "agentOptions": {
//     "identity": {
//       "_inner": [
//         "302a300506032b6570032100dbae424f137cfb187bb28be40b496ad60465b17ea2410af037b6caa8c8770499", "c6a0636ed4cd0d74cec531c78e1ed59a45800e3e24a4c21c7bb99f99b214553edbae424f137cfb187bb28be40b496ad60465b17ea2410af037b6caa8c8770499"
//       ],

//         "_delegation": {
//         "delegations": [{
//           "delegation": {
//             "expiration": "16c7b7049dc6ab23", "pubkey": "302a300506032b6570032100dbae424f137cfb187bb28be40b496ad60465b17ea2410af037b6caa8c8770499"
//           },
//           "signature": "d9d9f7a26b63657274696669636174655901fdd9d9f7a2647472656583018301830183024863616e697374657283018301820458207ffb967f1ab9f8366461c51343cf82df6625eceec927b07ad7ef0e91982f315d8301820458203141198d03889789324dcbbe7f1a60865fd6fa54db74a8844ea8ade6a1493f5283018204582035ffe50767d485ebbc38b2c8ce8be26fddc87b5903737b31a686dbaf07e443a583024a000000000000000701018301830183024e6365727469666965645f64617461820358200554a5f7b5244eea46209a61b5a734456a3c912d769149ad917de5380b1e4ff782045820fd5b59459758c8afecaf7285da359e4b5adb945fb86a3c1f0efd996c21a96938820458206a064127cc33bbb657e7605f27b3a9de613ce08908f8341efa30598ff8eee30382045820b9c00575df97f0c7a03bc6644c7830a8cf6cdbbcd694c3e1325124f3b4d0d24982045820bd1121046de2e66589d3e99968e27a34f0b6d782732e21f9f7b2ef36602210b882045820ca1d6ea4bd89decf1d85b7e0f2946f11331599ecb263610a6f799ee39cad97bf8301820458203a48d1fc213d49307103104f7d72c2b5930edba8787b90631f343b3aa68a5f0a83024474696d65820349a3d6dee3808edae316697369676e61747572655830a0f9d1067e5979b2eb966ea7feeb41449575679e3843ed21f5d5593b6bcec71e18982b4261930c29a448bbc38bfe7d92647472656583018204582016735c408673e3f0bbd12235523b10f828e42b22faec5489c52f0bcfb3771df4830243736967830182045820e221011c2327c33cd9e6b88576f9a592226b1b8b572485f0ac8c55efc8fcb509830182045820cb83f4e601edfb41489accb96e14bf1ec9e176129ed5b2aa13be600a5d11dd5583025820c67f32454a8dc004df12b62fa9ce2e5e8d54eacaf0fefbd131e8c2237c36e606830258208612ded0d152f9b5da0a92d8451887a00754555e421db7c6744e1b2846f70f5a820340"
//         }],
//           "publicKey":
//         "303c300c060a2b0601040183b8430102032c000a00000000000000070101d88d797d4578dbba06faa4ed01da1da0347cbdefdbda17457399ce9e9686a844"
//       },

//       "_principal": {
//         "_arr":
//         {
//           "0": 35, "1": 85, "2": 149, "3": 166, "4": 26, "5": 125, "6": 211, "7": 25, "8": 221, "9": 126, "10": 189, "11": 202, "12": 160, "13": 253, "14": 92, "15": 59, "16": 233, "17": 84, "18": 47, "19": 94, "20": 101, "21": 223, "22": 189, "23": 211, "24": 82, "25": 156, "26": 87, "27": 84, "28": 2
//         },
//         "_isPrincipal": true
//       }
//     }
//   }
// }