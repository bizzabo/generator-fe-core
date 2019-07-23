 generator-fe-core

### How to create a Front End Service:

- Run ```npm i```

- Run ```npm install -g yo```

- Run ```yo ~/git-repos/generator-fe-core/app --force```
- Give a project name (your github project name) and a service name

-------------------------

### How integrate a service to circle

##### Circle - Github 


 ###### login to circle - using ci user
 ![Alt Text](https://res.cloudinary.com/bizzabo/image/upload/c_crop,g_custom,q_auto:best/v1544006304/bkcpw4yomie34z2orzr4.png)
 ###### github -> add CI team as admin
![Alt Text](https://res.cloudinary.com/bizzabo/image/upload/c_crop,g_custom,q_auto:best/v1544006647/esyio5zebwhxpd9gjqij.png)
 ###### add project to circle
![Alt Text]( https://res.cloudinary.com/bizzabo/image/upload/c_crop,g_custom,q_auto:best/v1544006686/sq6zkvbfkfzte1dp2aka.png)
 ###### go to project settings -> permissions -> checkout SSH keys -> click authorize with Github
 ###### change CI user back to read in github
 ###### go to circle using your user -> add env variable based on web-registration/web-login project
   

##### Create a new ECR
 - go to AWS console 
 - GO TO AWS BIZZABO DEVELOPMENT!! 
 - ECS -> ERC 
 - create a new repository with your service name
![Alt Text]( https://res.cloudinary.com/bizzabo/image/upload/c_crop,g_custom,q_auto:best/v1544006914/kfrswcsspbersieklhny.png)
