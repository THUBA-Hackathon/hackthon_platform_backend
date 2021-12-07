use ic_cdk::export::{candid::{CandidType, Deserialize, Nat}};
use ic_cdk::storage;
use ic_cdk_macros::*;


type HackthonStore = Vec<Hackthon>;

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct Hackthon {
    pub title: String,
    pub tags: Vec<String>,
    pub ddl: String,
    pub intro: String,
    pub publish_time: String,
}

enum State {
    Student,
    Worker,
}

struct Person {
    pub name: String,
    pub tech: Vec<String>,
    pub state: State,
    pub email: String,
    pub phone: String,
    pub wechat: String,
}

struct Group {
    pub name: String,
    pub number: String,
    pub intro: String,
}


#[update(name = addHackthon)]
fn add_hackthon(hackthon_info: Hackthon) {
    let hackthon_store = storage::get_mut::<HackthonStore>();
    hackthon_store.push(hackthon_info);
}



#[query(name = listHackthonByPub)]
fn list_hackthon_by_publish_time() -> &'static Vec<Hackthon>{
    let hackthon_store = storage::get_mut::<HackthonStore>();
    hackthon_store.sort_by(|a, b| 
                            b.publish_time.cmp(&a.publish_time));
    hackthon_store
}

#[query(name = listHackthonByDDL)]
fn list_hackthon_by_ddl() -> &'static Vec<Hackthon> {
    let hackthon_store = storage::get_mut::<HackthonStore>();
    hackthon_store.sort_by(|a, b| 
        b.ddl.cmp(&a.ddl));
    hackthon_store
}

#[query(name = listHackthonByTag)]
fn list_hackthon_by_tag() -> &'static Vec<Hackthon> {
    let hackthon_store = storage::get_mut::<HackthonStore>();
    hackthon_store.sort_by(|a, b| 
        b.tags.cmp(&a.tags));
    hackthon_store
}

#[query(name = searchHackthonByTag)]
fn search_hackthon_by_tag(tag: String) -> Vec<Hackthon>  {
    let hackthon_store = storage::get::<HackthonStore>();
    let mut search_result = Vec::new();
    for h in hackthon_store.iter() {
        if h.tags.contains(&tag) {
            search_result.push(h.clone());
        }
    }
    search_result
}

