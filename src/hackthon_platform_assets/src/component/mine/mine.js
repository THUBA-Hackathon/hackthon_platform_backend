import React from "react"
import Nav from "../nav";
import MineTabs from "./mineTab";
import './mine.css'


class Mine extends React.Component{
    
    render(){
        return(
            <div >
                <Nav />
                <div className="container">
                    <MineTabs applyMessageList={this.props.applyMessageList} accountInfoData={this.props.accountInfoData} teamList={this.props.teamList}/>
                </div>
            </div>
        )
    }
}
  
export default Mine;