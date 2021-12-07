use ic_cdk::export::{candid::{CandidType, Deserialize}};
use ic_cdk::storage;
use ic_cdk_macros::*;


type HackthonStore = Vec<Hackthon>;

#[derive(Clone, Default, CandidType, Debug, Deserialize)]
struct Hackthon {
    pub title: String,
    pub tags: Vec<String>,
    pub holding_time: String,
    pub intro: String,
}

#[update(name = addHackthon)]
fn add_hackthon(hackthon_info: Hackthon) {
    let hackthon_store = storage::get_mut::<HackthonStore>();
    hackthon_store.push(hackthon_info);
}

#[query(name = listHackthon)]
fn list_hackthon() -> &'static Vec<Hackthon>{
    let hackthon_store = storage::get::<HackthonStore>();
    return hackthon_store;
}
