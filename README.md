# jobportal_service

Steps to use the service

1. clone the repo 
2. set the current working dir to /jobportal_service
3. npm install
4. set the connection string in /jobportal_service/db.js 
5. npm start 


Endpoints

[Post] /jobs  => to create job 
[Get] /jobs => to fetch all posted jobs
[Get] /jobs/:id => to fetch job by id
[Delete] /jobs/:id => to delete posted job by id

[Post] /user => to create user
[Get] /user/:id => to get user details
[Post] /user/:id => to add job application
[Patch] /user/:id => to change status of user's job application
