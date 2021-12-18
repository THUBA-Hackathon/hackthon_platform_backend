sudo dfx deploy --no-wallet
sudo dfx canister --no-wallet install token --argument="(\"\", \"Hacker Valley Coin\", \"HVC\", 8, 10000000000000000, principal \"f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe\", 10000)" --mode="reinstall"

sudo dfx canister --no-wallet call hackthon_platform registerUser  '(principal "f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe", record {name = "alice"; tech = vec {}; state = "student"; email = "alice@gmail.com"; phone = "110"; wechat = "110"; balance = 0})'
sudo dfx canister --no-wallet call hackthon_platform addHackthon '(record {title = "testHackthon"; sponsor= "Boy"; intro="Ahahhh"; start_time="2021"; ddl="2022"; groups= vec{}})'
sudo dfx canister --no-wallet call hackthon_platform listHackthon
sudo dfx canister --no-wallet call hackthon_platform init '(principal "ryjl3-tyaaa-aaaaa-aaaba-cai")'
sudo dfx canister --no-wallet call token balanceOf '(principal "f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe")'
sudo dfx canister --no-wallet call token transfer '(principal "rwlgt-iiaaa-aaaaa-aaaaa-cai", 100000000)'
sudo dfx canister --no-wallet call hackthon_platform createGroup '(principal "f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe", "testHackthon",record {name = "a"; number = 1; intro = "shit"; users = vec{}; submit_link = ""})'
sudo dfx canister --no-wallet call hackthon_platform listGroups
sudo dfx canister --no-wallet call hackthon_platform submitWork '("a","4399.com")'
sudo dfx canister --no-wallet call hackthon_platform listGroups