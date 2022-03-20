import * as React from 'react';
import MessageCenter from './messageCenter';
import AccountInfo from './accountInfo';
import MineTeam from './mineTeam';
import { bgColor, mainWidth } from "../../style"
import { useSearchParams } from 'react-router-dom';
import { Tab } from "../hackathon/hackathonDetails"

export default function MineTabs() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams?.get('tab') || "1";
  const [tab, setTab] = React.useState(defaultTab)

  return (
    <div style={{ marginTop: 50 }}>
      <div style={{ background: bgColor, paddingTop: 20 }}>
        <div className='flex-between' style={{
          width: mainWidth,
          justifyContent: "space-around",
          margin: 'auto',
          fontSize: 20
        }}>
          <Tab title="My Information" setTab={setTab} tab={tab} index="1"/>
          <Tab title="Message" setTab={setTab} tab={tab} index="2"/>
          <Tab title="My Team" setTab={setTab} tab={tab} index="3"/>
        </div>
      </div>
      <div style={{ width: mainWidth, margin: '60px auto' }}>
        {tab === "1" && <AccountInfo />}
        {tab === "2" && <MessageCenter />}
        {tab === "3" && <MineTeam />}
      </div>
    </div>
  );
}