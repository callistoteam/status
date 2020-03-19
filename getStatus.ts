import ky from "https://deno.land/x/ky/index.js"

import { Status } from './types.ts'

export default async function getStatus():Promise<Status>{
    const discord = await ky.get('https://srhpyqt94yxb.statuspage.io/api/v2/status.json').then((r: { json: () => any; }) => r.json())
    const cloudflare = await ky.get('https://yh6f0r4529hb.statuspage.io/api/v2/status.json').then((r: { json: () => any; }) => r.json())
    const bot = await ky.get('https://top.gg/api/bots/387548561816027138').then((r: { json: () => any; }) => r.json())
    const github = await ky.get('https://top.gg/api/bots/387548561816027138').then((r: { json: () => any; }) => r.json())
    const website = await ky.get('https://wonderbot.xyz').then((r: { ok: any; })=> r.ok)

    return { updated: new Date(), status: true, information: {website, discord: discord.status.description, cloudflare: cloudflare.status.description, github: github.status.description}}
}