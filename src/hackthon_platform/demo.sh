sudo dfx deploy

sudo dfx canister  call hackthon_platform createUserInfo  '(record {id = "f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe"; name = "alice"; area = "china"; phone = "110"; email = "alice@gmail.com"; school = "pku"; skills = vec {"js"}})'
sudo dfx canister  call hackthon_platform getSelfUserInfo
sudo dfx canister call hackthon_platform createHackathon '(record {id = "bb"; name = "testHackathon"; intro="Ahahhh"; sponsor= "Boy"; startdate="2021"; enddate="2022"; teams= vec{"none"}})'
sudo dfx canister call hackthon_platform getHackathonList
sudo dfx canister call hackthon_platform createTeam '(record {id = "cc"; hackathon_id = "bb"; name = "testTeam"; intro = "shit"; members = vec{}; skills_needed = vec{"Rust";"Frontend"}; code_link = ""; video_link = ""})'
sudo dfx canister call hackthon_platform getHackathonList
sudo dfx canister call hackthon_platform getTeamMembers '("cc")'
sudo dfx canister call hackthon_platform getTeamList '("bb")'
