sudo dfx deploy
sudo dfx canister install token --argument="(\"\", \"Hacker Valley Coin\", \"HVC\", 8, 10000000000000000, principal \"f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe\", 10000)"
sudo dfx canister call token approve '(principal "rrkah-fqaaa-aaaaa-aaaaq-cai",10000)'

sudo dfx canister call hackthon_platform addHackthon '(record {title = "testHackthon"; sponsor: "Boy"; intro:"Ahahhh"; start_time:"2021"; ddl:"2022"; groups: vec{}})'
sudo dfx canister call hackthon_platform listHackthon

sudo dfx canister call token balanceOf '(principal "f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe")'
sudo dfx canister call token allowance '(principal "f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe", principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'
sudo dfx canister call hackthon_platform createGroup '("testHackthon",record {name = "a"; number = 1; intro = "shit"; users = vec{}; submit_link = ""})'
sudo dfx canister call hackthon_platform listGroups
sudo dfx canister call hackthon_platform submitWork '("a","4399.com")'
sudo dfx canister call hackthon_platform listGroups