 generator-fe-core

### How to create a Front End Service:

- Clone ```generator-fe-core``` into your local

- Run ```cd ~/git-repos/generator-fe-core```

- Run ```npm i```

- Run ```npm install -g yo```

- Run ```yo ~/git-repos/generator-fe-core/app --force```
- Give a project name (your github project name) and a service name

- Create a new repository with your project name, and copy the generated project ```/generator-fe-core/dist/dist/YOUR_PROJECT``` into it

- Create a new branch in ```helm-assembly``` and do the following: 
    1. Copy the charts directory ```/generator-fe-core/dist/dist/charts``` into ```/helm-assembly/charts/bizzabo/charts/YOUR_PROJECT```
    2. Add the new project to ```/helm-assembly/charts/bizzabo/templates/_helpers.tpl```:
        ```
        {{- define "common.bizzabo.<<service-name>>.host" -}}
        {{- .Values.bizzabo<<serviceNameCamelCase>>Host | default .Values.global.bizzabo<<serviceNameCamelCase>>Host | default (printf "%s-<<service-name>>.ext.dev.bizzabo.com" .Release.Name) -}}
        {{- end -}}
        {{- define "common.bizzabo.<<service-name>>.url" -}}
        https://{{ template "common.bizzabo.<<service-name>>.host" . }}
        {{- end -}}
        ```
    3. Before merging to master, make sure you set the number of replicas of your service in the following files:
        ```
        values-qa.yaml
        values-qa-main.yaml
        values-qa-dataonly
        values-green-prod.yaml
        values-blue-prod.yaml
        ``` 

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
