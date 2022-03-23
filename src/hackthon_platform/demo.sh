dfx deploy
dfx identity use test1
dfx canister call hackthon_platform clear_storage
dfx canister  call hackthon_platform createUserInfo  '(record {id = "yt4c6-h6mrh-carmu-f2uek-wezi5-yrnk2-mcxab-tg4k6-ccstz-tthg2-wqe"; image_id = "test00"; name = "alice"; area = "china"; phone = "110"; email = "alice@gmail.com"; school = "pku"; skills = vec {"js"}})'
 
dfx canister call hackthon_platform createHackathon '(record {id = "bb"; image_id = "test00"; name = "testHackathon"; intro="Ahahhh"; sponsor= "Boy"; startdate="2021"; enddate="2022"; teams= vec{"none"}})'
dfx canister call hackthon_platform getHackathonList
dfx canister call hackthon_platform createTeam '(record {id = "cc"; hackathon_id = "bb"; name = "testTeam"; intro = "shit"; slogan = "fighting!"; members = vec{}; skills_needed = vec{"Rust";"Frontend"}; code_link = ""; video_link = ""})'
dfx canister call hackthon_platform getHackathonList
dfx canister call hackthon_platform getTeamInfo '("cc")'

dfx identity use test2

dfx canister  call hackthon_platform createUserInfo  '(record {id = "e3dho-ueiih-lvycj-jpyq6-xsfs6-knqpz-s26jc-2vkjo-itonl-ircze-qae"; name = "bob"; area = "china"; phone = "120"; email = "bob@gmail.com"; school = "pku"; skills = vec {"rust"}})'
dfx canister call hackthon_platform joinTeam '("cc")'
dfx canister call hackthon_platform getMessage
dfx identity use test1
dfx canister call hackthon_platform getMessage
dfx canister call hackthon_platform applyMessage '("1648023628390816000", true)'