dfx deploy

dfx canister  call hackthon_platform createUserInfo  '(record {id = "f3rmm-6y3ry-4uwth-wextp-r7dir-mihfe-yymvh-wwhst-ziegh-27byc-qqe"; image_id = "test00"; name = "alice"; area = "china"; phone = "110"; email = "alice@gmail.com"; school = "pku"; skills = vec {"js"}})'
 
dfx canister call hackthon_platform createHackathon '(record {id = "bb"; image_id = "test00"; name = "testHackathon"; intro="Ahahhh"; sponsor= "Boy"; startdate="2021"; enddate="2022"; teams= vec{"none"}})'
dfx canister call hackthon_platform getHackathonList
dfx canister call hackthon_platform createTeam '(record {id = "cc"; hackathon_id = "bb"; name = "testTeam"; intro = "shit"; slogan = "fighting!"; members = vec{}; skills_needed = vec{"Rust";"Frontend"}; code_link = ""; video_link = ""})'
dfx canister call hackthon_platform getHackathonList
dfx canister call hackthon_platform getTeamInfo '("cc")'

dfx canister --network ic call picture-bed putImg "(\"test_image\", "