import React from "react"
import TeamCard from '../team/team'
import './mine.css';
import '../team/team.css'


class MineTeam extends React.Component{
    render(){
        let dataList = this.props.teamList.map((item, index) => {
            //console.log(dataList)
            return (<div className="team_card_with_join_btn">
                        <TeamCard key={index} {...item} />
                        
                    </div>)
        })
        return(
            <div className="mine_team">
               {dataList}
            </div>
        )
    }
}
  
export default MineTeam;