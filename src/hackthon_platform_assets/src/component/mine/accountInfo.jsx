// 个人信息页面
import * as React from 'react';
import { useUser } from "../../context/user-context";
import { bgColorShallow, mainColor } from '../../style';
import { CardBox, Input, LabelBox, BtnGroup } from '../Card';
import { DataStateBox } from "../DataStateBox"
import { useMessage, useSmallLoading } from "../Loading"

export const AccountInfoCore = (props) => {
  const { css, onCancel } = props;
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
      skills: skill_list,
      id: user?.userId
    }
    if (name == '' || area == '' || phone == '' || email == "" || skill_list == '') {
      //alert('字段填写不完整！')
      message("warning", "Incomplete field filling!")
      return;
    }

    var myPhoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myPhoneReg.test(phone)) {
      message("warning", "Please enter the correct mobile phone number!")
      return
    }

    var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!ePattern.test(email)) {
      message("warning", "Please enter a correct email address!")
      return
    }

    setSmallLoading(true)
    await user.backendActor.createUserInfo(info);
    var user_info = await user.backendActor.getSelfUserInfo();
    setUser((pre) => ({ ...pre, userInfo: user_info }));
    
    setSmallLoading(false)
    message("success", 'Submitted successfully');
    onCancel && onCancel()
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
    }
  }, [user])

  return (
    <CardBox title="My information" css={{
      width: 600, margin: "auto", ...css
    }}>
      <Message />
      <LabelBox title="What should i call you ?">
        <Input maxLength={20} placeholder="Please enter name" type="name" value={name} setValue={setValue} />
      </LabelBox>
      <LabelBox title="Where do you come from ?">
        <Input maxLength={100} placeholder="Please enter area" type="area" value={area} setValue={setValue} />
      </LabelBox>
      <div className='flex-between'>
        <LabelBox title="Mobile phone" width={260}>
          <Input maxLength={50} placeholder="Please enter phone" type="phone" value={phone} setValue={setValue} />
        </LabelBox>
        <LabelBox title="Mailbox" width={260}>
          <Input maxLength={100} placeholder="Please enter email" type="email" value={email} setValue={setValue} />
        </LabelBox>
      </div>
      <LabelBox title="What role do you want to play in the team ?">
        <Input placeholder="Please enter role" type="skills" value={skills} setValue={setValue} />
      </LabelBox>
      <LabelBox title="Please introduce yourself">
        <textarea style={{
          height: 120,
          resize: "none",
          border: "none",
          color: mainColor,
          padding: 10,
          width: "100%",
          background: bgColorShallow,
          outline: "none",
        }} onChange={(val) => {
          if (val?.target?.value?.length >= 200) return
          setValue((pre) => ({ ...pre, school: val?.target?.value }))
        }} value={school}></textarea>
      </LabelBox>
      <BtnGroup onCancel={onCancel} onOk={handleSubmit} SmallLoading={SmallLoading} smallLoading={smallLoading} />
    </CardBox>
  )
}

export default function AccountInfo() {
  const { user } = useUser()

  return (
    <DataStateBox data={user?.userInfo || {}} loading={false}>
      <AccountInfoCore />
    </DataStateBox>
  )
}