// 个人信息页面
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './mine.css'
import { useNavigate } from "react-router-dom";
import { SingleEntryPlugin } from 'webpack';

const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

// 需要传入 用户名称 用户国家 手机 邮箱 希望担任的角色
export default function AccountInfo(props) {
  const [name, setName] = React.useState('')
  const [area, setArea] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [skills, setSkills] = React.useState('')
  const [school, setSchool] = React.useState('')
  const { user, setUser } = props.props;

  let navigate = useNavigate();

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
    await user.backendActor.createUserInfo(info);
    setUser({
      backendActor: user.backendActor, 
      principal: user.principal, 
      userInfo: info,
    });
    console.log("finish create userinfo: ", info);
  };

  React.useEffect(async () => {
    if (!user.userInfo) {
      if (!user.backendActor) {
        alert('Please connect wallet!');
        navigate('/');
      } else {
        console.log(user.backendActor);
        var user_info = await user.backendActor.getSelfUserInfo();
        console.log("get user info from backend: ", user_info);
        setUser({
          backendActor: user.backendActor, 
          principal: user.principal, 
          userInfo: user_info,
        });
      }
    }
    console.log("current user: ", user);
    console.log("current userInfo: ", user.userInfo);
    setName(user.userInfo.name);
    setArea(user.userInfo.area);
    setSchool(user.userInfo.school);
    setPhone(user.userInfo.phone);
    setEmail(user.userInfo.email);
    setSkills(user.userInfo.skills);
  }, [])

  return (
    <div>
      <TextField
        margin="dense"
        id="name"
        label="昵称"
        fullWidth
        variant="outlined"
        defaultValue={props.name}
        // value={name}
        onChange={(nameValue) => { setName(nameValue.target.value) }}
      />
      <TextField
        margin="dense"
        id="area"
        label="来自国家/地区"
        fullWidth
        variant="outlined"
        value={area}
        onChange={(areaValue) => { setArea(areaValue.target.value) }}
      />
      <TextField
        margin="dense"
        id="school"
        label="学校"
        fullWidth
        variant="outlined"
        value={school}
        onChange={(schoolValue) => { setSchool(schoolValue.target.value) }}
      />
      <TextField
        margin="dense"
        id="phone"
        label="手机"
        fullWidth
        variant="outlined"
        value={phone}
        onChange={(phoneValue) => { setPhone(phoneValue.target.value) }}
      />
      <TextField
        margin="dense"
        id="email"
        label="邮箱"
        variant="outlined"
        fullWidth
        type="email"
        value={email}
        onChange={(emailValue) => { setEmail(emailValue.target.value) }}
      />
      <TextField
        margin="dense"
        id="role_wanted"
        label="希望担任的角色"
        fullWidth
        variant="outlined"
        multiline
        value={skills}
        onChange={(skillsValue) => { setSkills(skillsValue.target.value) }}
      />
      {/* <Button onClick={handleClose}>取消</Button> */}
      <Button onClick={handleSubmit}>提交</Button>
    </div>
  )
}