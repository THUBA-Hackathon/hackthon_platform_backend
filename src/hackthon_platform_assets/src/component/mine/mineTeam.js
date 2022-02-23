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
        this.setState = this.setState.bind(this);

    }
    async componentDidMount() {

        let team_list = await this.context.user.backendActor.getMyTeams();
        console.log(team_list)
        this.setState({ teamList: team_list })

    }
    render() {
        var dataList = this.state.teamList.map((item, index) => {
            return (
                <div className="team_card_with_join_btn">
                    <UserContext.Consumer>
                    {value => <TeamCard 
                        key={index} 
                        intro={item.intro} 
                        name={item.name}
                        memberInfos={item.members}
                        skills_needed={item.skills_needed} 
                        showJoin={false}
                        teamId={item.id}
                        hackathonId={item.hackathon_id}
                        code_link={item.code_link}
                        video_link={item.video_link}
                    props={value} />}
                    </UserContext.Consumer>
                </div>
        )})
        return (
            <div className="mine_team">
                {dataList}
            </div>
        )
    }
}

export default MineTeam;