sudo dfx deploy

sudo dfx canister  call hackthon_platform createUserInfo  '(record {name = "alice"; area = "china"; phone = "110"; email = "alice@gmail.com"; school = "pku"; skills = vec {"js"}})'
sudo dfx canister  call hackthon_platform getSelfUserInfo
sudo dfx canister call hackthon_platform createHackathon '(record {id = "bb"; name = "testHackathon"; intro="Ahahhh"; sponsor= "Boy"; startdate="2021"; enddate="2022"; teams= vec{"none"}})'
sudo dfx canister call hackthon_platform getHackathonList
sudo dfx canister call hackthon_platform createTeam '(record {id = "cc"; hackathon_id = "bb"; name = "testTeam"; intro = "shit"; members = vec{"aa"}; skills_needed = vec{"Rust";"Frontend"}; code_link = ""; video_link = ""})'
sudo dfx canister call hackthon_platform getHackathonList
sudo dfx canister call hackthon_platform getTeamMembers '("cc")'
sudo dfx canister  call hackthon_platform createUserInfo  '(record {id = "dd"; name = "bob"; area = "china"; phone = "110"; email = "alice@gmail.com"; school = "pku"; skills = vec {"rust"}})'
sudo dfx canister  call hackthon_platform joinTeam '("dd", "cc")'
sudo dfx canister call hackthon_platform getTeamList '("bb")'
sudo dfx canister call hackthon_platform getMessage '("aa")'
sudo dfx canister call hackthon_platform applyMessage '("0", true)'
sudo dfx canister call hackthon_platform getAllMessage