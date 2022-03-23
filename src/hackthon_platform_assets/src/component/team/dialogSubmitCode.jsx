import * as React from 'react';
import { CardBox, Input, LabelBox, BtnGroup } from '../Card';
import Backdrop from '@mui/material/Backdrop';
import { useUser } from '../../context/user-context';
import { useSmallLoading, useMessage } from "../Loading";

export default function SubmitCodeDialog(props) {
  const [{
    code_link,
    video_link
  }, setValue] = React.useState({
    code_link: props?.teamInfo?.code_link,
    video_link: props?.teamInfo?.video_link
  })
  const { user } = useUser();
  const { isOpen, close, getTeams } = props;
  const { Message, message } = useMessage()
  const { SmallLoading, smallLoading, setSmallLoading } = useSmallLoading()

  const handleSubmit = async () => {
    // 提交表单
    setSmallLoading(true)
    try {
      await user.backendActor.submit(props?.teamInfo?.id || props?.teamInfo?.teamId, code_link, video_link);
      message("success", "Submitted successfully!");
      setSmallLoading(false)
      close();
      getTeams && getTeams();
    } catch (error) {
      setSmallLoading(false)
      close();
    }
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpen}
    >
      <Message />
      <CardBox title="Submit Project" css={{ width: 600, background: "white", maxHeight: "90vh" }}>
        <LabelBox title="Code link">
          <Input placeholder="Please enter code link" type="code_link" value={code_link} setValue={setValue} />
        </LabelBox>
        <LabelBox title="Video link">
          <Input placeholder="Please enter video link" type="video_link" value={video_link} setValue={setValue} />
        </LabelBox>
        <BtnGroup onOk={handleSubmit} onCancel={close} SmallLoading={SmallLoading} smallLoading={smallLoading} />
      </CardBox>
    </Backdrop>
  );
}