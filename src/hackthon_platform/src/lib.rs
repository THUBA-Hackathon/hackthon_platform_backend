use ic_cdk::export::{candid::{CandidType, Deserialize, Principal}};
use ic_cdk::storage;
use ic_cdk_macros::*;
use std::collections::HashMap;



type HackthonStore = Vec<Hackthon>;

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct Hackthon {
    pub title: String,
    pub tags: Vec<String>,
    pub ddl: String,
    pub intro: String,
    pub publish_time: String,
    pub groups: Vec<Group>,
}

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct User {
    pub name: String,
    pub tech: Vec<String>,
    pub state: String,
    pub email: String,
    pub phone: String,
    pub wechat: String,
}

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct Group {
    pub name: String,
    pub number: String,
    pub intro: String,
    pub users: Vec<User>,
    pub submit_link: String,
}

type UserStore = HashMap<Principal, User>;


#[update(name = addHackthon)]
fn add_hackthon(hackthon_info: Hackthon) {
    let hackthon_store = storage::get_mut::<HackthonStore>();
    hackthon_store.push(hackthon_info);
}



#[query(name = listHackthon)]
fn list_hackthon() -> &'static Vec<Hackthon>{
    let hackthon_store = storage::get::<HackthonStore>();
    
    hackthon_store
}

#[update(name = registerUser)]
fn register_user(user_info: User) {
    let id = ic_cdk::caller();
    let user_store = storage::get_mut::<UserStore>();
    user_store.insert(id, user_info);
}



#[update(name = createGroup)]
fn create_group(hackthon_name: String, group_info: Group) {
    let hackthon_store = storage::get_mut::<HackthonStore>();
    for h in hackthon_store.iter_mut() {
        if h.title.eq(&hackthon_name) {
            h.groups.push(group_info.clone())
        }
    }
}


#[update(name = joinGroup)]
fn join_group(hackthon_name: String, group_name: String) {
    let user_info = get_user_info();
    let hackthon_store = storage::get_mut::<HackthonStore>();
    for h in hackthon_store.iter_mut() {
        if h.title.eq(&hackthon_name) {
            for g in h.groups.iter_mut() {
                if g.name.eq(&group_name) {
                    g.users.push(user_info);
                    break;
                }
            }
            break;
        }
    }

}

#[update(name = getUserInfo)]
fn get_user_info() ->  User {
    let id = ic_cdk::caller();
    let user_store = storage::get::<UserStore>();
    user_store
        .get(&id)
        .cloned()
        .unwrap_or_else(|| User::default())
}





// #[query(name = listHackthonByDDL)]
// fn list_hackthon_by_ddl() -> &'static Vec<Hackthon> {
//     let hackthon_store = storage::get_mut::<HackthonStore>();
//     hackthon_store.sort_by(|a, b| 
//         b.ddl.cmp(&a.ddl));
//     hackthon_store
// }

// #[query(name = listHackthonByTag)]
// fn list_hackthon_by_tag() -> &'static Vec<Hackthon> {
//     let hackthon_store = storage::get_mut::<HackthonStore>();
//     hackthon_store.sort_by(|a, b| 
//         b.tags.cmp(&a.tags));
//     hackthon_store
// }

// #[query(name = searchHackthonByTag)]
// fn search_hackthon_by_tag(tag: String) -> Vec<Hackthon>  {
//     let hackthon_store = storage::get::<HackthonStore>();
//     let mut search_result = Vec::new();
//     for h in hackthon_store.iter() {
//         if h.tags.contains(&tag) {
//             search_result.push(h.clone());
//         }
//     }
//     search_result
// }

