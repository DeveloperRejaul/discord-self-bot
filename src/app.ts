import express, { Express } from "express";
import dotenv from "dotenv";
import { Discord } from "./discord/discord";
import { log } from "./log/log";
dotenv.config();


// require envs 
const envs = ["USER_TOKEN", "PORT"]

// available envs 
const allEnvs = new Set(Object.keys(process.env))

// check all required env exists
const existsEnvs = envs.every(env=> allEnvs.has(env));

// check env exists
if(!existsEnvs){
     log.error("Environment variable missing");
     process.exit(1)
} 

if(existsEnvs) log.info("Environment variable Loaded");



export async function main () {
    log.info("server starting .....");


    const app: Express = express();
    const port = process.env.PORT || 3000;
    
    const discord = new Discord(process.env.USER_TOKEN)

    discord.connect((data)=>{

        // lessen all message 
        console.log(data)
    })


    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    })

}
