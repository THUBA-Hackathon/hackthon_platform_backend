import { title } from "process";
import React from "react"
import './mine.css'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// 申请加入团队 需要传入 申请者姓名 申请者来自国家 申请者手机 申请者邮箱 申请者想担任的角色
class ApplyMessage extends React.Component{
    handleAccept() {
        // 接受队员
    };
    handleReject() {
        // 拒绝队员
    }
    render(){
        return(
            <div className="apply_message">
                <div className="message">Hi~{this.props.user_info.name} 申请加入你的团队</div>
                <div>
                    <div className="applyer_name">
                    <TextField
                        margin="dense"
                        id="name"
                        label="昵称"
                        fullWidth
                        variant="outlined"
                        defaultValue={this.props.user_info.name}
                    />
                    </div>
                    <div className="applyer_area">
                    <TextField
                        margin="dense"
                        id="area"
                        label="来自国家/地区"
                        fullWidth
                        variant="outlined"
                        defaultValue={this.props.user_info.area}
                    />
                    </div>
                    <div className="applyer_phone">
                    <TextField
                        margin="dense"
                        id="phone"
                        label="手机"
                        fullWidth
                        variant="outlined"
                        defaultValue={this.props.user_info.phone}
                    />
                    </div>
                    <div className="applyer_email">
                    <TextField
                        margin="dense"
                        id="email"
                        label="邮箱"
                        variant="outlined"
                        fullWidth
                        type="email"
                        defaultValue={this.props.user_info.email}
                    />
                    </div>
                    <div className="applyer_role">
                    <TextField
                        margin="dense"
                        id="role_wanted"
                        label="希望担任的角色"
                        fullWidth
                        variant="outlined"
                        multiline
                        defaultValue={this.props.user_info.skills}
                    />
                    </div>

                    <div className="reject_btn">
                        <Button onClick={this.handleReject.bind(this)}>拒绝</Button>
                    </div>
                    <div className="accept_btn">
                        <Button onClick={this.handleAccept.bind(this)}>接受</Button>
                    </div>
                </div>

            </div>
        )

    }
}

export default ApplyMessage;
