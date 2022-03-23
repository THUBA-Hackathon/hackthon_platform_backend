// 添加项目对话框
import * as React from 'react';
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import { useNavigate } from "react-router-dom";
import { mainWidth } from '../../style';
import { useUser } from '../../context/user-context';
import { CardBox, Input, LabelBox, BtnGroup } from '../Card';
import Backdrop from '@mui/material/Backdrop';
import { useMessage, useSmallLoading, useSwitch } from "../Loading"
import { mainColor, bgColorDeep } from "../../style";
import { AccountInfoCore } from '../mine/accountInfo';
import { BraftEditor } from "../BraftEditor";
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import moment from "moment"

// 传入的参数包括项目简介，队伍名称，队长昵称，队长email,技术栈列表
class AddTeam extends React.Component {
  render() {
    return (
      <div style={{
        border: `2px dashed ${mainColor}`,
        borderRadius: 10,
        background: bgColorDeep,
        position: "relative",
        marginTop: 60
      }}>
        <div className="intro_font" style={{ position: "absolute", top: 20, left: 40, color: mainColor, fontSize: 24, fontWeight: 700 }}>
          Create a Hackathon
        </div>
        <div className="flex-center" style={{ height: 150 }}>
          <svg width={20} height={20} viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M61.64 23.72V38.96H39.08V61.88H23V38.96H0.440001V23.72H23V0.68H39.08V23.72H61.64Z" fill="#0057FE" />
          </svg>
        </div>
      </div>
    );
  }
}

export const AddHackathon = (props) => {
  const [open, setOpen] = React.useState(false);
  const { user, connect } = useUser();
  const { isOpen, open: openAccount, close } = useSwitch();
  const [{
    name,
    intro,
    sponsor,
    startdate,
    enddate,
    image_id
  }, setValue] = React.useState({
    intro: "",
    name: "",
    sponsor: "",
    startdate: new Date(),
    enddate: new Date(),
    image_id: ""
  })
  const { Message, message } = useMessage()
  const { SmallLoading, smallLoading, setSmallLoading } = useSmallLoading()

  let navigate = useNavigate()

  const handleClickOpen = async () => {
    //检查用户是否填写过个人信息，没有的话先填写个人信息,个人信息也存入localstorage
    if (user.backendActor == null) {
      message("warning", "Please login!");
      connect()
    }
    else if (user.userInfo.name == '') {
      message("warning", "Please add your personal information!");
      openAccount()
    }
    else
      setOpen(true);
  };

  const handleSubmit = async () => {
    if (name == '' || intro == '' || startdate == '' || enddate == "" || sponsor == "") {
      message("warning", "Incomplete field filling!")
      return;
    }
    setSmallLoading(true)
    var uuid = "hackathonid" + guid();
    const data = {
      id: uuid,
      name,
      startdate: moment(startdate).format("YYYY-MM-DD HH:mm:ss"),
      sponsor,
      enddate: moment(enddate).format("YYYY-MM-DD HH:mm:ss"),
      intro,
      teams: [],
      image_id
    }
    const add_hackthon = await user.backendActor.createHackathon(data);
    console.log("create result: ", add_hackthon);

    message("success", 'Hackathon created successfully!');
    setSmallLoading(false)
    setValue({
      intro: "",
      name: "",
      startdate: "",
      enddate: "",
      sponsor: "",
      image_id: ""
    })
    setOpen(false);
    props?.getHackathonList && props?.getHackathonList()
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpen}
      >
        <AccountInfoCore onCancel={close} css={{ width: 600, background: "white", maxHeight: "90vh" }} />
      </Backdrop>
      <Message />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CardBox title="Create a Hackathon" css={{ width: 600, background: "white", maxHeight: "90vh" }}>
          <LabelBox title="Name of the Hackathon">
            <Input maxLength={30} placeholder="Please enter name" type="name" value={name} setValue={setValue} />
          </LabelBox>
          <LabelBox title="Bonus">
            <Input maxLength={30} placeholder="Please enter bonus, For example 100 USDT" type="sponsor" value={sponsor} setValue={setValue} />
          </LabelBox>
          <LabelBox title="Image">
            <Input placeholder="Please enter image url" type="image_id" value={image_id} setValue={setValue} />
          </LabelBox>
          <LabelBox title="Event Introduction">
            <BraftEditor value={intro} type="intro" setValue={setValue} />
          </LabelBox>
          <LabelBox title="The Date">
            {/* <Input placeholder="Please enter start time" type="startdate" value={startdate} setValue={setValue} /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className='flex-between'>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  value={startdate}
                  label="start time"
                  onChange={(newValue) => {
                    setValue((pre) => ({ ...pre, startdate: newValue }))
                  }}
                />
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  value={enddate}
                  label="end time"
                  onChange={(newValue) => {
                    setValue((pre) => ({ ...pre, enddate: newValue }))
                  }}
                />
              </div>
            </LocalizationProvider>
          </LabelBox>
          <BtnGroup onOk={handleSubmit} onCancel={handleClose} SmallLoading={SmallLoading} smallLoading={smallLoading} />
        </CardBox>
      </Backdrop>
    </div>
  );
}