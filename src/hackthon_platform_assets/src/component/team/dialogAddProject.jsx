// 添加项目对话框
import * as React from 'react';
import AddTeam from './newTeam';
import { mainWidth } from '../../style';
import { useUser } from '../../context/user-context';
import { CardBox, Input, LabelBox, BtnGroup } from '../Card';
import Backdrop from '@mui/material/Backdrop';
import { useMessage, useSmallLoading, useSwitch } from "../Loading"
import { AccountInfoCore } from '../mine/accountInfo';
import { BraftEditor } from '../BraftEditor';


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
  const { isOpen, open: openAccount, close } = useSwitch();

  const handleClickOpen = async () => {
    //检查用户是否填写过个人信息，没有的话先填写个人信息,个人信息也存入localstorage
    if (!user.backendActor) {
      message("warning", "Please login!");
      connect()
    }
    else if (!user?.userInfo?.name) {
      message("warning", "Please add your personal information!");
      openAccount()
    }
    else
      setOpen(true);
  };

  const handleSubmit = async () => {
    if (name == '' || intro?.length <= 6 || intro === "<p><br></p>" || stack == '' || slogan == "") {
      message("warning", "Incomplete field filling!")
      return;
    }
    setSmallLoading(true)
    var uuid = "teamid" + guid();
    var hackathon_id = props.hackathonId;
    var stack_list = stack.split(" ");
    const data = {
      id: uuid,
      name,
      intro,
      slogan,
      members: [],
      skills_needed: stack_list,
      hackathon_id,
      video_link: '',
      code_link: ''
    }

    await user.backendActor.createTeam(data);

    message("success", 'Team created successfully!');
    setSmallLoading(false)

    setValue({
      intro: "",
      name: "",
      slogan: "",
      stack: ""
    })

    setOpen(false);
    props.getTeams(hackathon_id);
  };

  const handleClose = () => {
    /* if (smallLoading) {
      message("warning", '正在创建中，无法关闭！');
      return
    } */
    setValue({
      intro: "",
      name: "",
      slogan: "",
      stack: ""
    })
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
        open={isOpen}
      >
        <AccountInfoCore onCancel={close} css={{ width: 600, background: "white", maxHeight: "90vh" }} />
      </Backdrop>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CardBox title="Create a Team Project" css={{ width: 600, background: "white", maxHeight: "90vh" }}>
          <LabelBox title="Name of the team">
            <Input maxLength={30} placeholder="Please enter name" type="name" value={name} setValue={setValue} />
          </LabelBox>
          <LabelBox title="Slogan">
            <Input maxLength={100} placeholder="Please enter slogan" type="slogan" value={slogan} setValue={setValue} />
          </LabelBox>
          <LabelBox title="The role you need is">
            <Input placeholder="Please enter stack (Please separate them with Spaces)" type="stack" value={stack} setValue={setValue} />
          </LabelBox>
          <LabelBox title="Please introduce your project">
            <BraftEditor value={intro} type="intro" setValue={setValue} />
          </LabelBox>
          <BtnGroup onOk={handleSubmit} onCancel={handleClose} SmallLoading={SmallLoading} smallLoading={smallLoading} />
        </CardBox>
      </Backdrop>
    </div>
  );
}