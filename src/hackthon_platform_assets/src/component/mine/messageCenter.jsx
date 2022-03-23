import React, { useState, useCallback, useEffect } from "react";
import { CardBox, Input, LabelBox, BtnGroup } from '../Card';
import { useMessage, useSmallLoading } from "../Loading";
import { useUser } from "../../context/user-context";
import { DataStateBox } from "../DataStateBox";
import Collapse from '@mui/material/Collapse';
import { useSwitch } from "../Loading";
import { bgColorShallow, mainColor } from "../../style";

const ApplyMessage = (props) => {
    const { isOpen, open, close } = useSwitch()
    const { finished, id, user_info: { name,
        area,
        phone,
        email,
        skills,
        school, }, team_name, getMessage } = props;
    const [clickType, setClickType] = React.useState("");
    const { user } = useUser();
    const { Message, message } = useMessage();
    const { SmallLoading, smallLoading, setSmallLoading } = useSmallLoading();
    const handleAccept = async () => {
        // 接受队员
        if (smallLoading) return
        setSmallLoading(true)
        setClickType("ok")
        await user.backendActor.applyMessage(id, true);
        message("success", "Successful receiver!");
        setSmallLoading(false)
        getMessage()
    };
    const [isopen, setOpen] = useState();

    const handleReject = async () => {
        // 拒绝队员
        if (smallLoading) return
        setClickType("cancel")
        setSmallLoading(true)
        await user.backendActor.applyMessage(id, false);
        message("success", "Team member rejected successfully!")
        setSmallLoading(false)
        getMessage()
    }

    return (
        <CardBox css={{ width: "100%", margin: "auto auto 40px auto" }}>
            <Collapse in={isOpen}>
                <Message />
                <LabelBox title="What should i call you ?">
                    <Input placeholder="Please enter name" type="name" value={name} setValue={() => { }} disabled />
                </LabelBox>
                <LabelBox title="Where do you come from ?">
                    <Input placeholder="Please enter area" type="area" value={area} setValue={() => { }} disabled />
                </LabelBox>
                <div className='flex-between' style={{ width: "100%" }}>
                    <LabelBox title="Mobile phone" width={"calc(50% - 20px)"}>
                        <Input placeholder="Please enter phone" type="phone" value={phone} setValue={() => { }} disabled />
                    </LabelBox>
                    <LabelBox title="Mailbox" width={"calc(50% - 20px)"}>
                        <Input placeholder="Please enter email" type="email" value={email} setValue={() => { }} disabled />
                    </LabelBox>
                </div>
                <LabelBox title="What role do you want to play in the team ?">
                    <Input placeholder="Please enter role" type="role" value={skills} setValue={() => { }} disabled />
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
                    }}  value={school} disabled></textarea>
                </LabelBox>
                <BtnGroup onOk={!finished ? handleAccept : undefined} onCancel={!finished ? handleReject : undefined} okText="Accept" cancelText="Refuse" SmallLoading={SmallLoading} smallLoading={smallLoading} clickType={clickType} close={close} />
            </Collapse>
            {!isOpen && <div style={{ cursor: "pointer", fontSize: 20 }} onClick={open}>
                <strong>{name}</strong> apply to join the team <strong>{team_name}</strong> {finished && <strong>✅</strong>}
            </div>}
        </CardBox>
    )
}

const MessageCenter = () => {
    const [applyMessageList, setApplyMessageList] = useState([])
    const { user } = useUser()
    const { isOpen, open, close } = useSwitch()

    const getMessage = useCallback(async () => {
        if (!user.backendActor) return
        open()
        let message_list = await user.backendActor.getMessage();
        console.log(message_list)
        setApplyMessageList(message_list);
        close()
    }, [user])

    useEffect(() => {
        if (!user.backendActor) return
        getMessage()
    }, [user])

    return (
        <DataStateBox data={applyMessageList} loading={isOpen} emptyDesc={"No Message Data"}>
            {applyMessageList.map((item, index) => {
                return (<ApplyMessage key={index}  {...item} getMessage={getMessage} />);
            })}
        </DataStateBox>
    );
}

export default MessageCenter;