// 个人信息页面
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './mine.css'
import { hackthon_platform } from "../../../../declarations/hackthon_platform";
import { AuthClient } from "@dfinity/auth-client";

const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

var usr_addr = localStorage.getItem('id');
async function handleAuthenticated(authClient) {
  const identity = await authClient.getIdentity();
  window.localStorage.setItem("id", identity.getPrincipal().toString());
}
// 需要传入 用户名称 用户国家 手机 邮箱 希望担任的角色
export default function AccountInfo() {
  const [name, setName] = React.useState('')
  const [area, setArea] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [skills, setSkills] = React.useState('')
  const [school, setSchool] = React.useState('')

  const handleSubmit = async () => {
    // 提交表单
    console.log(usr_addr)
    if(!usr_addr) {
      const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
            handleAuthenticated(authClient);
        }
        authClient.login({
            onSuccess: async () => {
                // authClient now has an identity
                handleAuthenticated(authClient);
            },
            identityProvider: process.env.DFX_NETWORK === "ic"
              ? "https://identity.ic0.app/#authorize"
              : process.env.LOCAL_II_CANISTER,
            // Maximum authorization expiration is 8 days
            maxTimeToLive: days * hours * nanoseconds,
        });
    }
    else {
      var skill_list = skills.split(",");
      console.log(usr_addr + school + name + phone + email + skills + area)
      console.log(skill_list)
      await hackthon_platform.createUserInfo({id : usr_addr, school: school ,name : name, area : area, phone : phone, email : email, skills : skill_list});

      let sleep= (time)=> new Promise((resolve)=>{
        setTimeout(resolve,time)
      })
      // sleep(2000);
      // window.location.reload()
      console.log("finish create userinfo")
    }
    
  };

  React.useEffect(async ()=>{
    try{
      var userInfo = await hackthon_platform.getUserInfo(usr_addr);
      console.log(userInfo)
      setName(userInfo.name)
      setArea(userInfo.area)
      setSchool(userInfo.school)
      setPhone(userInfo.phone)
      setEmail(userInfo.email)
      setSkills(userInfo.skills)
    } catch(e) {
      alert('Please fill your info first!')
    }
    
}, [])

  return (
    <div>
            <TextField
                margin="dense"
                id="name"
                label="昵称"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(nameValue) => {setName(nameValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="area"
                label="来自国家/地区"
                fullWidth
                variant="outlined"
                value={area}
                onChange={(areaValue) => {setArea(areaValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="area"
                label="学校"
                fullWidth
                variant="outlined"
                value={school}
                onChange={(schoolValue) => {setSchool(schoolValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="phone"
                label="手机"
                fullWidth
                variant="outlined"
                value={phone}
                onChange={(phoneValue) => {setPhone(phoneValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="email"
                label="邮箱"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(emailValue) => {setEmail(emailValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="role_wanted"
                label="希望担任的角色"
                fullWidth
                variant="outlined"
                multiline
                value={skills}
                onChange={(skillsValue) => {setSkills(skillsValue.target.value)}}
            />
            {/* <Button onClick={handleClose}>取消</Button> */}
            <Button onClick={handleSubmit}>提交</Button>
    </div>
  )
}