import { log } from './../log/log';
import  WebSocket  from "ws";
import { DiscordPayload, DiscordResp } from "../type/type";
let ws =  new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json")


export class Discord {
    private payload : DiscordPayload
    
    constructor( private token:string ){
        this.payload = {
            op:2,
            d:{
                large_threshold:250,
                properties:{
                    os:"linux",
                    browser: "chrome",
                    device: "chrome"
                },
                token:this.token
            },
        }
    }

    heartbeat (ms:number) {
        return setInterval(()=> {
            ws.send(JSON.stringify({op:1, d:null}))
        },ms)
    }

    connect (callback: (data : DiscordResp)=> void) {
        ws.on("open", ()=>{
            ws.send(JSON.stringify(this.payload));
        });

        // Don't let it close the connection
        ws.on('close', () => {
            ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
        })

        ws.on("message", (data: WebSocket.RawData)=> {
            let payload = JSON.parse(data.toString());
            let { t , op, d } = payload;

            switch (op) {
                case 10:
                  const { heartbeat_interval } = d;
                  this.heartbeat(heartbeat_interval);
                  break;
        
                case 7:
                  log.debug(payload);

                default:
                    break;
            }

            switch (t) {
                case 'READY':
                  log.info(`=> Logged in as ${d.user.username}#${d.user.discriminator}`);
                  break;
        
                case 'MESSAGE_CREATE':
                  callback(d);
                  break;
                default:
                  break;
            }


        })
    }

}