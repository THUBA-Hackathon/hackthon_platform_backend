import React, { useState, useEffect } from "react";
import { useUser } from "../../context/user-context";
import { useSwitch } from "../Loading";
import { CardBox, Input, LabelBox, BtnGroup } from '../Card';
import { useMessage, useSmallLoading } from "../Loading"
import { DataStateBox } from "../DataStateBox"
import Collapse from '@mui/material/Collapse';

const ApplyMessage = (props) => {
    const { isOpen, open, close } = useSwitch()
    const { finished, id,user_info: { name,
        area,
        phone,
        email,
        skills,
        school, } } = props;
    const [clickType, setClickType] = React.useState("");
    const { user } = useUser();
    const { Message, message } = useMessage()
    const { SmallLoading, smallLoading, setSmallLoading } = useSmallLoading()
    const handleAccept = async () => {
        // 接受队员
        if (smallLoading) return
        setSmallLoading(true)
        setClickType("ok")
        await user.backendActor.applyMessage(id, true);
        message("success", "成功接收队员!");
    };

    const handleReject = async () => {
        // 拒绝队员
        if (smallLoading) return
        setClickType("cancel")
        setSmallLoading(true)
        await user.backendActor.applyMessage(id, false);
        message("success", "成功拒绝队员!")
    }

    return (
        <CardBox css={{ width: "100%", margin: "auto auto 40px auto" }}>
            <Collapse in={isOpen}>
                <Message />
                <LabelBox title="What should i call you ?">
                    <Input maxLength={20} placeholder="Please enter name" type="name" value={name} setValue={() => { }} disabled />
                </LabelBox>
                <LabelBox title="Where do you come from ?">
                    <Input maxLength={50} placeholder="Please enter area" type="area" value={area} setValue={() => { }} disabled />
                </LabelBox>
                <div className='flex-between' style={{ width: "100%" }}>
                    <LabelBox title="Mobile phone" width={"calc(50% - 20px)"}>
                        <Input maxLength={20} placeholder="Please enter phone" type="phone" value={phone} setValue={() => { }} disabled />
                    </LabelBox>
                    <LabelBox title="Mailbox" width={"calc(50% - 20px)"}>
                        <Input maxLength={100} placeholder="Please enter email" type="email" value={email} setValue={() => { }} disabled />
                    </LabelBox>
                </div>
                <LabelBox title="What role do you want to play in the team ?">
                    <Input placeholder="Please enter role" type="role" value={area} setValue={() => { }} disabled />
                </LabelBox>
                <LabelBox title="Please introduce yourself">
                    <Input placeholder="Please enter introduce" type="introduce" value={area} setValue={() => { }} disabled />
                </LabelBox>
                <BtnGroup onOk={handleAccept} onCancel={handleReject} okText="Accept" cancelText="Refuse" SmallLoading={SmallLoading} smallLoading={smallLoading} clickType={clickType} close={close} />
            </Collapse>
            {!isOpen && <div style={{ cursor: "pointer", fontSize: 20 }} onClick={open}>
                [{name}] apply to join the team
            </div>}
        </CardBox>
    )
}

const MessageCenter = () => {
    const [applyMessageList, setApplyMessageList] = useState([{
        finished: false,
        id: "8",
        sender_id: "z2ypx-3zr5b-ocpje-wruch-2azmi-pfpl6-ghdc2-g3zhl-3dcwa-zsa6r-3ae",
        team_id: "teamid79012174-8ffa-8d3f-a37a-6f333c2241a6",
        user_id: "z2ypx-3zr5b-ocpje-wruch-2azmi-pfpl6-ghdc2-g3zhl-3dcwa-zsa6r-3ae",
        user_info: {
            area: "2",
            email: "5",
            name: "12",
            phone: "4",
            school: "3",
            skills: ['6']
        }
    }])
    const { user } = useUser()
    const { isOpen, open, close } = useSwitch()

    useEffect(async () => {
        if (!user.backendActor) return
        open()
        let team_list = await user.backendActor.getMessage();
        close()
        console.log(team_list)
        setApplyMessageList(team_list)
    }, [user])

    return (
        <DataStateBox data={applyMessageList} loading={isOpen} emptyDesc={"No Message Data"}>
            {applyMessageList.map((item, index) => {
                return (<ApplyMessage key={index}  {...item} />);
            })}
        </DataStateBox>
    );
}

export default MessageCenter;