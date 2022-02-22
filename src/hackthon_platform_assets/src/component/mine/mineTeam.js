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

        let team_list = await this.context.user.backendActor.getMyTeams();
        console.log(team_list)
        this.setState({teamList: team_list})
        
    }
    render() {
        let dataList = this.state.teamList.map((item, index) => {
            //console.log(dataList)
            return (<div className="team_card_with_join_btn">
                        <TeamCard key={index} {...item} />
                    </div>)
        })
        return (
            <div className="mine_team">
                {dataList}
            </div>
        )
    }
}

export default MineTeam;