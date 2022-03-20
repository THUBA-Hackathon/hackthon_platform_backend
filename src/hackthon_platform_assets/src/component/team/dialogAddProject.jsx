// 添加项目对话框
import * as React from 'react';
import AddTeam from './newTeam';
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import { useNavigate } from "react-router-dom";
import { mainWidth } from '../../style';
import { useUser } from '../../context/user-context';
import { CardBox, Input, LabelBox, BtnGroup } from '../Card';
import Backdrop from '@mui/material/Backdrop';
import { useMessage, useSmallLoading } from "../Loading"


export default function AddProjectDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { user, connect } = useUser();
  const [{
    name,
    intro,
    slogan,
    stack,
  }, setValue] = React.useState({
    intro: "",
    name: "",
    slogan: "",
    stack: ""
  })
  const { Message, message } = useMessage()
  const { SmallLoading, smallLoading, setSmallLoading } = useSmallLoading()

  let navigate = useNavigate()


  const handleClickOpen = async () => {
    //检查用户是否填写过个人信息，没有的话先填写个人信息,个人信息也存入localstorage
    if (user.backendActor == null) {
      message("warning", "请您连接钱包!");
      connect()
    }
    else if (user.userInfo.name == '') {
      message("warning", "请您填写个人信息!");
      navigate('/mine')
    }
    else
      setOpen(true);
  };

  const handleSubmit = async () => {
    if (name == '' || intro == '' || stack == '' || slogan == "") {
      message("warning", "字段填写不完整！")
      return;
    }
    setSmallLoading(true)
    var uuid = "teamid" + guid();
    var hackathon_id = props.hackathonId;
    var stack_list = stack.split(" ");
    console.log(name + intro + stack)
    await user.backendActor.createTeam({ id: uuid, name: name, intro: intro, members: [], skills_needed: stack_list, hackathon_id: hackathon_id, video_link: '', code_link: '' });

    var list_team = await hackthon_platform.getTeamList(hackathon_id);
    props.setTeamList(list_team);

    message("success", '创建队伍成功！');
    setSmallLoading(false)

    setValue({
      intro: "",
      name: "",
      slogan: "",
      stack: ""
    })

    setOpen(false);
  };

  const handleClose = () => {
    /* if (smallLoading) {
      message("warning", '正在创建中，无法关闭！');
      return
    } */
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
    <div style={{ margin: "auto auto 50px auto", width: mainWidth }}>
      <div onClick={handleClickOpen} style={{ cursor: "pointer" }}>
        <AddTeam />
      </div>
      <Message />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CardBox title="Create a Team Project" css={{ width: 600, background: "white", maxHeight: "90vh" }}>
          <LabelBox title="Name of the team">
            <Input maxLength={20} placeholder="Please enter name" type="name" value={name} setValue={setValue} />
          </LabelBox>
          <LabelBox title="Slogan">
            <Input maxLength={50} placeholder="Please enter slogan" type="slogan" value={slogan} setValue={setValue} />
          </LabelBox>
          <LabelBox title="The role you need is">
            <Input placeholder="Please enter stack (Please separate them with Spaces)" type="stack" value={stack} setValue={setValue} />
          </LabelBox>
          <LabelBox title="Please introduce your project">
            <Input placeholder="Please enter introduce" type="intro" value={intro} setValue={setValue} />
          </LabelBox>
          <BtnGroup onOk={handleSubmit} onCancel={handleClose} SmallLoading={SmallLoading} smallLoading={smallLoading} />
        </CardBox>
      </Backdrop>
    </div>
  );
}