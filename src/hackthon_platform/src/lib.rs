use time::*;

struct Hackthon {
    title: String,
    tags: [String],
    holding_time: PrimitiveDateTime, 
}


#[ic_cdk_macros::query]
fn print() {
    ic_cdk::print("Hello World from DFINITY!");
    
}