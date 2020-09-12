# rct-forum

A forum for players of OpenRCT2, the open source re-implementation of Rollercoaster Tycoon 2. 

rollercoaster tycoon dot forum dot biz

Technologies: MERN, React (reusable styled components), CSS (flex box), maybe Bootstrap, Auth0
S3

Users:
	DB: username*/ bio?/ SCREENSHOTS/ PARKS/ type? User or Admin
	Views:	Show (Profile), Register, Login, Edit/Delete
	Levels of Authorization:
		Unlogged in users: can view stuff
		Logged in users: can post comments, screenshots, can submit parks for  
approval, edit and delete their stuff
		Admins: approve parks, can delete anything

Screenshots:
	DB: Image file*/ name*/ story/ USER*/ PARK/ comments: user, body/ date
	Views: Show, Index(organized by newest), Create, Edit/Delete

Parks:
	DB: file*/ name*/ story/ USER*/ overview pic*/ SCREENSHOTS/ comments/ 
bool: published?/ date
	Views: Show, Index, Create, Approval Queue

Additional Views: 
	Home page 

STRETCH GOALS:
Contests:
DB: name*/ description(rules)*/ deadline/ bool: current?/ results: [PARKS]/ comments

Tags:
	DB: name*/ SCREENSHOTS/ PARKS


User Story:
User lands at the home page where they can see new content,what’s going on on the site. They have the option of login/register or continuing without logging in. Even without login they have the option of checking out new parks or screenshots. They also have the option of registering for the site or logging in. Upon logging in they can comment, post their screenshots, edit/delete their screenshots, parks and profile. Users cannot simply post their parks on the site, but they can submit them for approval by an admin. Any admin will have access to a panel where they can approve/deny a park to be posted. Admins can also delete anything on the site.
