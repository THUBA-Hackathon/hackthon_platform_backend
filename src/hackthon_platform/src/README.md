# Backend Interface 
**source code:** lib.rs

## Structs
```
# struct of user info
type User_2 = record{
    "name": text;
    "area": text;
    "phone": text;
    "email": text;
    "school": text;
    "skills": vec text;
};

# struct of a hackathon team
type Team_2 = record{
    "id" : text;
    "hackathon_id" : text;
    "name": text;
    "intro": text;
    "members": vec text; # stores all members' id
    "skills_needed": vec text;
    "code_link": text;
    "video_link" : text;
};

# struct of a hackathon
type Hackathon_2 = record{
    "id" : text;
    "name" : text;
    "intro" : text;
    "sponsor" : text;
    "startdate" : text;
    "enddate" : text;
    "teams" : vec text; # stores all teams' id
};

# struct of a message
type Message_2 = record{
    "id" : text;
    "user_id" : text;  # receiver id
    "sender_id" : text; # sender id
    "user_info" : User_2;
    "team_id" : text;
    "finished" : bool; # if message has been processed
};
```
## Functions
```
getHackathonList
	Get all hackathons available on the platform.
	Parameters: ()
	Return:  (vec Hackathon_2)     	# a vector of all hackathons
	
createHackathon 
	Create a hackathon on the platform.
	Parameters: (Hackathon_2)     	# hackathon info
	Return: ()
	
createUserInfo
	Register a user on the platform.
	Parameters: (User_2)    		# user info
	Return: ()
	
createTeam
	Create a hackathon team.
	Parameters: (Team_2)    		# team info
	Return: ()
	
joinTeam
	A user join a hackathon team. 
	Parameters: (text)  			# team_id. user is the caller
	Return: ()
	
getTeamList
	Get all teams of a given hackathon.
	Parameters: (text)				# hackathon_id
	Return: (vec Team_2)			# All teams' info
	
getTeamMembers
	Get all members of a given team.
	Parameters: (text)				# team_id
	Return: (vec User_2)			# All users' info
	
getUserInfo
	Get info of a given user.
	Parameters: (text)				# user_id
	Return: (User_2)				# user info
	
getMessage
	Get messages of a user.
	Parameters: ()					# user id is caller
	Return: (vec Message_2)			# All messages of this user
	
applyMessage
	Accept or reject a message.
	Parameters: (text, bool)		# message id
	Return: ()						
	
getAllMessage
	Get all messages.
	Parameters: ()					
	Return: (vec Message_2)			# All messages
 
submit
	Submit the finished work
	Parameters: (text, text, text)	# team_id, code_link, video_link
	Return: ()

getSelfUserInfo
	Get user info of myself
	Parameters: ()					# user_id is caller
	Return: (User_2)				# user info

```