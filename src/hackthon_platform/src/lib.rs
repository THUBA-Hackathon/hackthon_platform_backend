use ic_cdk::export::{candid::{CandidType, Deserialize, Principal, Nat}};
use ic_cdk::storage;
use ic_cdk_macros::*;
use ic_cdk::api;
//use candid::Principal;
use std::collections::HashMap;


struct Token(Principal);

impl Default for Token {
    fn default() -> Self {
        Token(Principal::anonymous())
    }
}
type HackthonStore = Vec<Hackthon>;

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct Hackthon {
    pub title: String,
    // pub tags: Vec<String>,
    pub sponsor: String,
    pub intro: String,
    pub start_time: String,
    pub ddl: String,
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
    pub balance: Nat,
}

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct Group {
    pub name: String,
    pub number: Nat,
    pub intro: String,
    pub users: Vec<User>,
    pub submit_link: String,
}

type UserStore = HashMap<Principal, User>;


#[update(name = init)]
fn init(token_addr: Principal) {
    let token_storage = storage::get_mut::<Token>();
    *token_storage = Token(token_addr);
}

#[update(name = addHackthon)]
async fn add_hackthon(sponsor_addr:Principal, hackthon_info: Hackthon){
    let hackthon_store = storage::get_mut::<HackthonStore>();
    hackthon_store.push(hackthon_info);
    let token_addr = storage::get::<Token>().0;
    let sponsor_addr = ic_cdk::caller();
    let result: Result<(Nat,),_> = api::call::call(token_addr, "transferFrom", (sponsor_addr, api::id(), 1000)).await;
}

#[query(name = testApi)]
fn test_apiId() -> Principal {
    api::id()
}

#[query(name = listHackthon)]
fn list_hackthon() -> &'static Vec<Hackthon>{
    let hackthon_store = storage::get::<HackthonStore>();
    hackthon_store
}

#[update(name = registerUser)]
fn register_user(id:Principal, user_info: User) {
    let user_store = storage::get_mut::<UserStore>();
    user_store.insert(id, user_info);
}



#[update(name = createGroup)]
fn create_group(id:Principal, hackthon_name: String, group_info: Group) {
    let hackthon_store = storage::get_mut::<HackthonStore>();

    for h in hackthon_store.iter_mut() {
        if h.title.eq(&hackthon_name) {
            let mut this_group = group_info.clone();
            this_group.users.push(get_user_info(id));
            h.groups.push(this_group);
        }
    }
}


#[update(name = joinGroup)]
fn join_group(id:Principal, hackthon_name: String, group_name: String) {
    let user_info = get_user_info(id);
    let hackthon_store = storage::get_mut::<HackthonStore>();
    for h in hackthon_store.iter_mut() {
        if h.title.eq(&hackthon_name) {
            for g in h.groups.iter_mut() {
                if g.name.eq(&group_name) {
                    g.users.push(user_info);
                    return;
                }
            }
        }
    }

}

#[update(name = getUserInfo)]
fn get_user_info(id:Principal) ->  User {
    let user_store = storage::get::<UserStore>();
    user_store
        .get(&id)
        .cloned()
        .unwrap_or_else(|| User::default())
}

#[update(name = submitWork)]
fn submit_work(group_name:String, link: String) {
    let hackthon_store = storage::get_mut::<HackthonStore>();
    for h in hackthon_store.iter_mut() {
            for g in h.groups.iter_mut() {
                if g.name.eq(&group_name) {
                    g.submit_link = link;
                    send_award(&g.users[0]);
                    return;
                }
            }
    }
}


#[query(name = listGroups)]
fn list_groups() -> Vec<Group>{
    let hackthon_store = storage::get_mut::<HackthonStore>();
    let mut return_group: Vec<Group> = Vec::new();
    for h in hackthon_store.iter_mut() {
        return_group.extend(h.groups.iter().cloned());
    }
    return_group
}

async fn send_award(user_info: &User) {
    let user_store = storage::get::<UserStore>();
    let token_addr = storage::get::<Token>().0;
    for (id,info) in user_store {
        if user_info.name.eq(&info.name) {
            let result: Result<(Nat,),_> = api::call::call(token_addr, "transfer", (&id, 10)).await;
            return;
        }
    }
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

