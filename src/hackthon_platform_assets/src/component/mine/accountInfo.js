// 个人信息页面
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './mine.css'

// 需要传入 用户名称 用户国家 手机 邮箱 希望担任的角色
export default function AccountInfo(props) {

  const handleSubmit = () => {
    // 提交表单
  };

  const handleClose = () => {
      
  };

  return (
    <div>
            <TextField
                margin="dense"
                id="name"
                label="昵称"
                fullWidth
                variant="outlined"
                defaultValue={props.accountInfoData.account_name}
            />
            <TextField
                margin="dense"
                id="area"
                label="来自国家/地区"
                fullWidth
                variant="outlined"
                defaultValue={props.accountInfoData.account_area}
            />
            <TextField
                margin="dense"
                id="phone"
                label="手机"
                fullWidth
                variant="outlined"
                defaultValue={props.accountInfoData.account_phone}
            />
            <TextField
                margin="dense"
                id="email"
                label="邮箱"
                variant="outlined"
                fullWidth
                type="email"
                defaultValue={props.accountInfoData.account_email}
            />
            <TextField
                margin="dense"
                id="role_wanted"
                label="希望担任的角色"
                fullWidth
                variant="outlined"
                multiline
                defaultValue={props.accountInfoData.account_role_wanted}
            />
            {/* <Button onClick={handleClose}>取消</Button> */}
            <Button onClick={handleSubmit}>提交</Button>
    </div>
  )
}