use std::collections::HashMap;
use ic_kit::ic::caller;
use ic_cdk::export::{candid::{CandidType, Deserialize, Principal}};
use ic_cdk::storage;
use ic_cdk_macros::*;
use ic_cdk::api;

//use candid::Principal;



type HackathonStore = HashMap<String, Hackathon>;
type MessageStore = HashMap<String, Message>;

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct Hackathon {
    pub id: String,
    pub name: String,
    pub intro: String,
    pub sponsor: String,
    pub startdate: String,
    pub enddate: String,
    pub teams: Vec<String>,
}

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct Message {
    pub id: String,
    pub user_id: String,
    pub sender_id: String,
    pub user_info: User,
    pub team_id: String,
    pub finished: bool,
}

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct User {
    pub name: String,
    pub area: String,
    pub phone: String,
    pub email: String,
    pub school: String,
    pub skills: Vec<String>,
}

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct Team {
    pub id: String,
    pub hackathon_id: String,
    pub name: String,
    pub intro: String,
    pub members: Vec<String>,
    pub skills_needed: Vec<String>,
    pub code_link: String,
    pub video_link: String,
}

type UserStore = HashMap<String, User>;
type TeamStore = HashMap<String, Team>;



#[update(name = createHackathon)]
async fn add_hackathon(hackathon_info: Hackathon){
    let hackathon_store = storage::get_mut::<HackathonStore>();
    hackathon_store.insert(hackathon_info.id.clone(), hackathon_info);
    
}

#[query(name = testApi)]
fn test_api_id() -> Principal {
    api::id()
}

#[query(name = getHackathonList)]
fn list_hackathon() -> Vec<Hackathon>{
    let hackathon_store = storage::get::<HackathonStore>();
    hackathon_store.values().cloned().collect()
}

#[update(name = createUserInfo)]
fn register_user(user_info: User) {
    let id = caller();
    let user_store = storage::get_mut::<UserStore>();
    user_store.insert(id.to_text(),user_info);
}

#[update(name = createTeam)]
fn create_group(team_info: Team) {
    let hackathon_store = storage::get_mut::<HackathonStore>();
    let mut temp_hackathon = Hackathon::default();
    let hackathon = hackathon_store
            .get_mut(&team_info.hackathon_id)
            .unwrap_or_else(||(&mut temp_hackathon));
    hackathon.teams.push(team_info.id.clone());
    let mut new_team = team_info.clone();
    new_team.members.push(caller().to_text());
    let team_store = storage::get_mut::<TeamStore>();
    team_store.insert(team_info.id.clone(), new_team);
    
}

#[update(name = joinTeam)]
fn join_group(team_id: String) {
    let user_id = caller().to_text();
    let team_store = storage::get::<TeamStore>();
    let message_store = storage::get_mut::<MessageStore>();
    let temp_team = Team::default();
    let team_info = team_store
            .get(&team_id)
            .unwrap_or_else(||(&temp_team));
    let team_leader = team_info.members[0].clone();
    println!("{}",team_leader);
    let message = Message {
        id: message_store.keys().len().to_string(),
        sender_id : user_id.clone(),
        user_id : team_leader,
        team_id : team_id.clone(),
        user_info : get_user_info(user_id),
        finished : false
    };
    send_message(message);
    // team_info.members.push(user_id);
}

#[query(name = getTeamList)]
fn get_team_list(hackathon_id: String) ->  Vec<Team>{
    let hackathon_store = storage::get::<HackathonStore>();
    let team_store = storage::get::<TeamStore>();
    let hackathon = hackathon_store
            .get(&hackathon_id)
            .cloned()
            .unwrap_or_else(||(Hackathon::default()));
    let mut team_list: Vec<Team> = Vec::new();
    for team_id in hackathon.teams.iter() {
        team_list.push(team_store
            .get(team_id)
            .cloned()
            .unwrap_or_else(||(Team::default())));
    }
    team_list
}

#[query(name = getTeamMembers)]
fn get_team_members(team_id: String) -> Vec<User> {
    let team_store = storage::get::<TeamStore>();
    let user_store = storage::get::<UserStore>();
    let team = team_store
            .get(&team_id)
            .cloned()
            .unwrap_or_else(||(Team::default()));
    let mut user_list: Vec<User> = Vec::new();
    for user_id in team.members.iter() {
        user_list.push(user_store
            .get(user_id)
            .cloned()
            .unwrap_or_else(||(User::default())));
    }
    user_list
}

#[update(name = getUserInfo)]
fn get_user_info(id: String) ->  User {
    let user_store = storage::get::<UserStore>();
    user_store
        .get(&id)
        .cloned()
        .unwrap_or_else(|| User::default())
}

#[update(name = getSelfUserInfo)]
fn get_self_user_info() ->  User {
    let id = caller().to_text();
    get_user_info(id)
}

fn send_message(message_info: Message) {
    let message_store = storage::get_mut::<MessageStore>();
    message_store.insert(message_info.id.clone(), message_info);
}

#[query(name = getAllMessage)]
fn get_all_message() -> Vec<Message> {
    let message_store = storage::get::<MessageStore>();
    message_store.values().cloned().collect()
}

#[query(name = getMessage)]
fn get_message() -> Vec<Message> {
    let user_id = caller().to_text();
    let message_store = storage::get::<MessageStore>();
    let mut message_list: Vec<Message> = Vec::new();
    for message in message_store.values() {
        if message.user_id.eq(&user_id) && message.finished == false{
            message_list.push(message.clone());
        }
    }
    message_list
}

#[update(name = applyMessage)]
fn apply_message(message_id: String, ans: bool) {
    let message_store = storage::get_mut::<MessageStore>();
    let mut temp_message = Message::default();
    let message = message_store
            .get_mut(&message_id)
            .unwrap_or_else(||&mut temp_message);
    message.finished = true;
    if ans == true {
        let team_store = storage::get_mut::<TeamStore>();
        let mut temp_team = Team::default();
        let team_info = team_store
                .get_mut(&message.team_id)
                .unwrap_or_else(||(&mut temp_team));
        team_info.members.push(message.sender_id.clone());

    }
}   


#[update(name = submit)]
fn submit_work(team_id: String, code_link: String, video_link: String) {
    let team_store = storage::get_mut::<TeamStore>();
    let mut temp_team = Team::default();
    let team_info = team_store
            .get_mut(&team_id)
            .unwrap_or_else(||(&mut temp_team));
    team_info.code_link = code_link;
    team_info.video_link = video_link;
}


// async fn send_award(user_info: &User) {
//     let user_store = storage::get::<UserStore>();
//     let token_addr = storage::get::<Token>().0;
//     for (id,info) in user_store {
//         if user_info.name.eq(&info.name) {
//             let result: Result<(Nat,),_> = api::call::call(token_addr, "transfer", (&id, 10)).await;
//             return;
//         }
//     }
// }


// #[query(name = listHackathonByDDL)]
// fn list_Hackathon_by_ddl() -> &'static Vec<Hackathon> {
//     let Hackathon_store = storage::get_mut::<HackathonStore>();
//     Hackathon_store.sort_by(|a, b| 
//         b.ddl.cmp(&a.ddl));
//     Hackathon_store
// }

// #[query(name = listHackathonByTag)]
// fn list_Hackathon_by_tag() -> &'static Vec<Hackathon> {
//     let Hackathon_store = storage::get_mut::<HackathonStore>();
//     Hackathon_store.sort_by(|a, b| 
//         b.tags.cmp(&a.tags));
//     Hackathon_store
// }

// #[query(name = searchHackathonByTag)]
// fn search_Hackathon_by_tag(tag: String) -> Vec<Hackathon>  {
//     let Hackathon_store = storage::get::<HackathonStore>();
//     let mut search_result = Vec::new();
//     for h in Hackathon_store.iter() {
//         if h.tags.contains(&tag) {
//             search_result.push(h.clone());
//         }
//     }
//     search_result
// }

