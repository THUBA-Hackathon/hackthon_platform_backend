// 个人信息页面
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/user-context";
import { CardBox, Input, LabelBox, BtnGroup } from '../Card';
import { DataStateBox } from "../DataStateBox"
import { useMessage, useSmallLoading } from "../Loading"

// 需要传入 用户名称 用户国家 手机 邮箱 希望担任的角色
export default function AccountInfo() {
  const [{
    name,
    area,
    phone,
    email,
    skills,
    school
  }, setValue] = React.useState({
    name: "",
    area: "",
    phone: "",
    email: "",
    skills: [],
    school: ""
  })
  const { user, setUser } = useUser()
  const { Message, message } = useMessage()
  const { SmallLoading, setSmallLoading, smallLoading } = useSmallLoading()

  const handleSubmit = async () => {
    // 提交表单
    var skill_list = skills.split(",");
    console.log(name + '\n' + area + '\n' + phone + '\n' + email + '\n' + school + '\n' + skills)
    var info = {
      name: name,
      area: area,
      phone: phone,
      email: email,
      school: school,
      skills: skill_list
    }
    if (name == '' || area == '' || phone == '' || email == "" || skill_list == '') {
      //alert('字段填写不完整！')
      message("warning", "字段填写不完整！")
      return;
    }
    setSmallLoading(true)
    await user.backendActor.createUserInfo(info);
    setUser({
      backendActor: user.backendActor,
      principal: user.principal,
      userInfo: info,
    });
    //updateTextField();
    console.log("finish create userinfo: ", info);
    setSmallLoading(false)
    message("success", '提交成功');
  };

  React.useEffect(async () => {
    if (!user.backendActor) {
      return;
    }
    else {
      setValue({
        ...user.userInfo,
        skills: user.userInfo.skills.join()
      })
      // var user_info = await user.backendActor.getSelfUserInfo();
      // console.log("get user info from backend: ", user_info);
      // // console.log(user_info.name)

      // setUser({
      //   backendActor: user.backendActor, 
      //   principal: user.principal, 
      //   userInfo: user_info,
      // });
      // updateTextField();
    }
  }, [user])

  return (
    <DataStateBox data={user?.userInfo || {}} loading={false}>
      <CardBox title="My information" css={{
        width: 600, margin: "auto"
      }}>
        <Message />
        <LabelBox title="What should i call you ?">
          <Input maxLength={20} placeholder="Please enter name" type="name" value={name} setValue={setValue} />
        </LabelBox>
        <LabelBox title="Where do you come from ?">
          <Input maxLength={50} placeholder="Please enter area" type="area" value={area} setValue={setValue} />
        </LabelBox>
        <div className='flex-between'>
          <LabelBox title="Mobile phone" width={260}>
            <Input maxLength={20} placeholder="Please enter phone" type="phone" value={phone} setValue={setValue} />
          </LabelBox>
          <LabelBox title="Mailbox" width={260}>
            <Input maxLength={100} placeholder="Please enter email" type="email" value={email} setValue={setValue} />
          </LabelBox>
        </div>
        <LabelBox title="What role do you want to play in the team ?">
          <Input placeholder="Please enter role" type="skills" value={skills} setValue={setValue} />
        </LabelBox>
        <LabelBox title="Please introduce yourself">
          <Input placeholder="Please enter introduce" type="school" value={school} setValue={setValue} />
        </LabelBox>
        <BtnGroup onOk={handleSubmit} SmallLoading={SmallLoading} smallLoading={smallLoading} />
      </CardBox>
    </DataStateBox>
  )
}