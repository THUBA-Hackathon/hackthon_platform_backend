// 个人信息页面
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './mine.css'
import { hackthon_platform } from "../../../../declarations/hackthon_platform";

var usr_addr = localStorage.getItem('id');
// 需要传入 用户名称 用户国家 手机 邮箱 希望担任的角色
export default function AccountInfo() {
  const [name, setName] = React.useState('')
  const [area, setArea] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [skills, setSkills] = React.useState('')

  const handleSubmit = async () => {
    // 提交表单
    var skill_list = skills.split(" ");
    await hackthon_platform.createUserInfo({id : usr_addr, school: 'test' ,name : name, area : area, phone : phone, email : email, skills : skill_list});
    console.log("aaaaaaatest")
  };

  React.useEffect( async ()=>{
    var usr_addr = localStorage.getItem('id');
    console.log(typeof(usr_addr))
    try{
      var userInfo = await hackthon_platform.getUserInfo({id : usr_addr});
      setName(userInfo.name)
      setArea(userInfo.area)
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
                defaultValue={name}
                onChange={(nameValue) => {setName(nameValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="area"
                label="来自国家/地区"
                fullWidth
                variant="outlined"
                defaultValue={area}
                onChange={(areaValue) => {setArea(areaValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="phone"
                label="手机"
                fullWidth
                variant="outlined"
                defaultValue={phone}
                onChange={(phoneValue) => {setPhone(phoneValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="email"
                label="邮箱"
                variant="outlined"
                fullWidth
                type="email"
                defaultValue={email}
                onChange={(emailValue) => {setEmail(emailValue.target.value)}}
            />
            <TextField
                margin="dense"
                id="role_wanted"
                label="希望担任的角色"
                fullWidth
                variant="outlined"
                multiline
                defaultValue={skills}
                onChange={(skillsValue) => {setSkills(skillsValue.target.value)}}
            />
            {/* <Button onClick={handleClose}>取消</Button> */}
            <Button onClick={handleSubmit}>提交</Button>
    </div>
  )
}