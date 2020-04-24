import express from "express";
import fetch from 'node-fetch'
import * as Discord from 'discord.js'
import moment from 'moment';
import 'moment-with-locales-es6'
import md from 'marked'

moment.locale('ko')

import config from './config'
import { Status, Issue } from './types'
let status:Status
const client = new Discord.Client()
client.login(config.token)
class App {
  public application : express.Application;
  constructor(){
    this.application = express();
  }
}
const app = new App().application;
app.set('view engine', 'ejs');
app.set('index', './views/index.ejs')
app.set('api', './views/api.ejs')

app.get("/", async (req : express.Request , res : express.Response) => {
    if(Number(status.updated)+180000 < Number(new Date())){
        try {
            const discord = await fetch('https://srhpyqt94yxb.statuspage.io/api/v2/status.json', { method: 'GET'}).then((r: { json: () => any; }) => r.json())
            const cloudflare = await fetch('https://yh6f0r4529hb.statuspage.io/api/v2/status.json', { method: 'GET'}).then((r: { json: () => any; }) => r.json())
            const github = await fetch('https://kctbh9vrtdwd.statuspage.io/api/v2/status.json', { method: 'GET'}).then((r: { json: () => any; }) => r.json())
            const wbweb = await fetch('https://wonderbot.xyz', { method: 'GET'}).then((r) => r.status === 200).catch(() => {return false})
            const web = await fetch('https://callisto.team', { method: 'GET'}).then((r) => r.status === 200).catch(() => {return false})
            const support = await fetch('https://support.callisto.team', { method: 'GET'}).then((r) => r.status === 200).catch(() => {return false})
            const wbapi = await fetch('https://api.wonderbot.xyz', { method: 'GET'}).then((r) => r.status === 200).catch(() => {return false})
            const wonderbot = (await client.users.cache.get(config.wonderbot)?.presence.status) === 'offline' ? false : true
            const parkbot = (await client.users.cache.get(config.parkbot)?.presence.status) === 'offline' ? false : true
            const issues:Issue[] = await fetch(config.github + '/issues?state=all').then(r=> r.json()).catch(e=> { return [] })
        status = { updated: new Date(), status: true, information: { all: discord&&cloudflare&&github&&wbweb&&web&&support&&wbapi&&wonderbot&&parkbot, wonderbot, parkbot, web, wbweb, wbapi, support, discord: discord.status.description, cloudflare: cloudflare.status.description, github: github.status.description, issues: issues.splice(0, 9) } }
        }
        catch {
            status = { updated: new Date(), status: false, information: { all: false, wonderbot: false, parkbot: false, web: false, wbweb: false, wbapi: false, support: false,discord: 'Fail to get Information', cloudflare: 'Fail to get Information', github: 'Fail to get Information', issues: [] } }
        }
    }
    await res.render('index', {status, codes: { true: '정상', false: '오프라인'}, color: {true: 'green', false: 'red'}, moment, md })
})

app.get("/api", async (req : express.Request , res : express.Response) => {
    res.render('api')
})  

app.get("/api/status", async (req : express.Request , res : express.Response) => {
    if(status.status === false || Number(status.updated)+180000 < Number(new Date())){
        try {
        const discord = await fetch('https://srhpyqt94yxb.statuspage.io/api/v2/status.json', { method: 'GET'}).then((r: { json: () => any; }) => r.json())
        const cloudflare = await fetch('https://yh6f0r4529hb.statuspage.io/api/v2/status.json', { method: 'GET'}).then((r: { json: () => any; }) => r.json())
        const github = await fetch('https://kctbh9vrtdwd.statuspage.io/api/v2/status.json', { method: 'GET'}).then((r: { json: () => any; }) => r.json())
        const wbweb = await fetch('https://wonderbot.xyz', { method: 'GET'}).then((r) => r.status === 200).catch(() => {return false})
        const web = await fetch('https://callisto.team', { method: 'GET'}).then((r) => r.status === 200).catch(() => {return false})
        const support = await fetch('https://support.callisto.team', { method: 'GET'}).then((r) => r.status === 200).catch(() => {return false})
        const wbapi = await fetch('https://api.wonderbot.xyz', { method: 'GET'}).then((r) => r.status === 200).catch(() => {return false})
        const wonderbot = (await client.users.cache.get(config.wonderbot)?.presence.status) === 'offline' ? false : true
        const parkbot = (await client.users.cache.get(config.parkbot)?.presence.status) === 'offline' ? false : true
        const issues:Issue[] = await fetch(config.github + '/issues?state=all').then(r=> r.json()).catch(e=> { return [] })
        status = { updated: new Date(), status: true, information: { all: discord&&cloudflare&&github&&wbweb&&web&&support&&wbapi&&wonderbot&&parkbot, wonderbot, parkbot, web, wbweb, wbapi, support, discord: discord.status.description, cloudflare: cloudflare.status.description, github: github.status.description, issues: issues.splice(0, 9) } }

        }
        catch {
            status = { updated: new Date(), status: false, information: { all: false, wbapi: false, wonderbot: false, parkbot: false, web: false, wbweb: false, support: false, discord: 'Fail to get Information', cloudflare: 'Fail to get Information', github: 'Fail to get Information', issues: [] } }
        }
        res.json(status)
    }
    else{
        res.json(status)
    }
  })
  app.listen(8080, async function(){
      console.log('App Ready')
    status = {updated: new Date(0), status: false}  
})


app.use(function(err: Error, req: express.Request, res: express.Response) {
    if(!err.stack) return
    console.error(err.stack)
    res.status(500).send('Something broke!');
  });