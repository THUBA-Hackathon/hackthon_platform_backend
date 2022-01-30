import React from "react"
import TeamCard from '../team/team'
import './mine.css';
import '../team/team.css'
import UserContext from "../../context/user-context";

class MineTeam extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            teamList: []
        }

    }
    async componentDidMount() {

        let hackathon_list = await this.context.user.backendActor.getHackathonList();
        // for (var i = 0; i < hackathon_list.length; i++) {
        //     let team_list = await this.context.user.backendActor.getTeamList(hackathon_list[i].id)
        //     for (var j = 0; j < team_list.length; j++) {
        //         let member_list = await this.context.user.backendActor.getTeamMembers(team_list[j].id)

        //         for (var k = 0; k < member_list.length; k++) {
        //             // 比较是否是当前用户
        //             console.log(member_list[k])
        //             if (member_list[k].name == this.context.user.userInfo) {
        //                 this.setState({teamList:[[j]]})
        //             }
        //         }
        //     }
        // }
    }
    render() {
        // let dataList = this.props.teamList.map((item, index) => {
        //     //console.log(dataList)
        //     return (<div className="team_card_with_join_btn">
        //                 <TeamCard key={index} {...item} />

        //             </div>)
        // })
        return (
            <div className="mine_team">
                {/* {dataList} */}
            </div>
        )
    }
}

export default MineTeam;