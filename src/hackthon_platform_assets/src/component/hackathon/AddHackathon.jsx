// 添加项目对话框
import * as React from 'react';
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
    startdate: null,
    enddate: null,
    image_id: ""
  })
  const { Message, message } = useMessage()
  const { SmallLoading, smallLoading, setSmallLoading } = useSmallLoading()
  const [{ img, imgBlob }, setImg] = React.useState({})

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
    if (name == '' || intro == '' || startdate == '' || enddate == "" || sponsor == "" || !image_id) {
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

    await user.backendActorPictureBed.putImg(image_id, [...imgBlob]);

    /*    const s = {
         enddate: "2022-03-25 11:19:52",
         id: "hackathonid12f79b0f-91b7-43bd-365a-87f58680f654",
         image_id: image_id,//"https://img2.baidu.com/it/u=1536626104,3290640479&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
         intro: "<p>\t\t眼下冬奥会正如火如荼地进行。2月10日，孙哥的波场TRON也为全球区块链开发者带来了属于他们的奥运会：2022波场黑客松大赛。</p><p>\t\t事实上，将波场举办的开发者大赛比做区块链界的奥运会毫不为过，从2018年首届波场TRON开发者大赛，到2019年SUN Network开发者大赛，再到2021全球DeFi Hackathon，无不吸引了来自全球范围内各路好手参与角逐。经过一届又一届赛事的沉淀，可以说，由波场背书的黑客松大赛代表着区块链技术研发的最高水平。</p><p>\t\t与往届大赛不同，本届大赛是由TRON DAO和BitTorrent Chain（BTTC）共同举办。有了能够完美兼容波场、以太坊、币安智能链等主流公链的BTTC的加持，势必会吸引更多公链生态中的优秀开发者参与其中。</p><p>\t\t另一方面，对作为东道主的波场TRON而言，这也是一个向全世界展示国产第一公链实力的大好机会。波场生态近期利好不断：波场TRON账户总数日前正式突破7600万；DeFi市场重量级选手、波场系最大去中心化交易平台SunSwap宣布与SUN.io进行整合，升级DeFi玩法，掀开市场竞争序幕；而作为另一主办方的BitTorrent也高调进军以太坊生态……</p><p>\t\t此时适时推出的波场 TRON 黑客松大赛正是一个吸引人才以及“秀肌肉”的绝佳窗口。随着大赛的进行，波场友好的开发环境、卓越的网络性能，超强的跨链技术将吸引更多的开发者及用户加入到这场技术创新的狂欢之中。下面，就让我们一同走进这场盛会。</p><p>\t\t“在不远的未来，去中心化存储、去中心化应用、数字资产和加密货币钱包将与我们息息相关。随着安全性强、点对点的去中心化网络不断普及，区块链正逐渐成为 Web 3.0 去中心化网络的重要核心。”孙哥如是说。2022 波场 TRON 黑客松大赛将为民间高手提供一展身手的舞台，加速 Web 3.0 时代来临，并助力区块链生态蓬勃发展。</p><p>\t\t作为波场TRON宣布TRON Foundation正式改组为TRON DAO，成为全球最大的去中心化组织之后举办的第一届黑客松大赛，本届大赛在赛制、规模等方面都完成了全面升级。</p><p>\t\t不同于以往，本届大赛从一年一场升级为一年三场，是真正意义上的“马拉松”式的黑客松大赛。其时间跨度从2月14日持续11月13日，足以让波场链和BTTC的开发热情燃遍春秋冬夏。</p><p>每场黑客松都分为四大热门赛道：</p><p>\t\tWeb3：打造实用的 DAO 工具和 SocialFi，推动 Web 2.0 向 Web 3.0 的过渡；</p><p>\t\tDeFi：借力 DeFi 打造普惠便利的金融解决方案，造福数十亿普罗大众；</p><p>\t\tGameFi：融合区块链与娱乐，定义下一代游戏；</p><p>\t\tNFT：拥抱创作者经济时代。</p><p>\t\t无论你是区块链/智能合约开发者、设计师还是产品经理，不管是单兵作战还是抱团取暖，都有资格报名一展身手。只要参赛者在每场比赛对应的截止日期前使用Solidity编程语言完成以上任意赛道项目的开发，并将参赛项目公布至 TRON DAO 论坛，就有资格参与评选。</p>",
         name: "2022波场黑客松大赛",
         sponsor: "100000 TRX",
         startdate: "2022-03-23 18:31:40",
         teams: [],
       } */

    const add_hackthon = await user.backendActor.createHackathon(data);
    console.log("create result: ", add_hackthon);

    message("success", 'Hackathon created successfully!');
    setSmallLoading(false)
    setValue({
      intro: "",
      name: "",
      startdate: null,
      enddate: null,
      sponsor: "",
      image_id: ""
    })
    setOpen(false);
    props?.getHackathonList && props?.getHackathonList()
  };

  const handleClose = () => {
    setOpen(false);
  };


  //用于生成uuid
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }

  const uploadImg = async (event) => {
    //上传图片
    let e = event || window.event;
    let files = e.target.files;
    if (files.length > 0) {
      let file = e.target.files[0];
      let fileName = e.target.files[0].name;  // 文件名称
      let fileSize = e.target.files[0].size;  // 文件大小
      if (fileSize > 1 * 1024 * 1024) {
        message("warning", "The size of the uploaded image should not exceed 1M");
        return false;
      }

      if (!/\.(jpg|jpeg|png|JPG|PNG|webp)$/.test(e.target.value)) {
        message("warning", 'The image type must be JPEG, JPG, or PNG');
        return false;
      }

      let reader = new FileReader(); // 创建一个 filereader对象
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = new Uint8Array(reader.result);
          const uuid = "imageid" + guid();
          setImg((pre) => ({
            ...pre,
            imgBlob: data
          }));

          setValue((pre) => ({
            ...pre,
            image_id: uuid
          }));
        }
      };
      // 转化为blob
      reader.readAsArrayBuffer(file);

      let readerImg = new FileReader(); // 创建一个 filereader对象
      readerImg.onload = e => {
        let data;
        data = e.target.result;
        setImg((pre) => ({
          ...pre,
          img: data
        }));
      };
      readerImg.readAsDataURL(file);
    }
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
            <Input maxLength={100} placeholder="Please enter name" type="name" value={name} setValue={setValue} />
          </LabelBox>
          <LabelBox title="Bonus">
            <Input maxLength={20} placeholder="Please enter bonus, For example 100 USDT" type="sponsor" value={sponsor} setValue={setValue} />
          </LabelBox>
          <LabelBox title="Image">
            {/* <Input placeholder="Please enter image url" type="image_id" value={image_id} setValue={setValue} /> */}
            <input type="file" accept="image/png,image/jpeg,image/jpg,image/bmp,image/webp" onChange={uploadImg} name="myPic" id="thePic" style={{ display: "none" }} />
            <label htmlFor="thePic" style={{ cursor: "pointer" }}>
              <img src={img || require("../../../assets/add.png")} style={{ maxWidth: "100%", border: !img ? `1px solid ${mainColor}` : "none", padding: !img ? `30px` : "0px", borderRadius: !img ? 5 : 0 }} />
            </label>
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