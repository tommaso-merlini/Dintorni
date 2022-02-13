# server dell'app dintorni 
> ip: 142.93.164.58
> 
> token: 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
> 
`.env_sample` is not the real .env file, just a sample :D

### instructions for production
```
1. clone repo into server
2. paste in the .env_sample file the real enviroment variables
3. change the name from .env_sample to .env
4. run docker-compose up --scale node-app=3
```
