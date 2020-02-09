Ideas of what could have been improved:

Backend
- restrict CORS policy 
- add unit tests / integration tests 

FE
- remove ui framework (such a pain -.-) 
- move state stored in app.js to React's Context so that other components that are not children of App can consume the result. 
- remove lodash ( use substring instead of _.truncate)
- general folder structure
  - context in one folder
  - views in another 
  
Deployment
- heroku
- AWS - react app in s3, api gateway + lambda or an ec2 instance 
  - route53 for domain registration 
  - enable https for server communication 
