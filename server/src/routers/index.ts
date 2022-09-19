import Express from "express";
import { createAd, getAdsByGameId, getDiscordByAd } from "../controller/ad_controller";

import { getAllGames } from "../controller/game_controller";

const router = Express.Router()

router.get('/games', async (req, res) =>{
    let games = await getAllGames()
    return res.json(games)
})

router.post('/games/:gameId/ads', async (req, res) =>{
    let gameId = req.params.gameId
    let body = req.body
    let resInsert = await createAd({gameId:gameId, data:body})
    return res.status(201).json(resInsert)
})

router.get('/games/:id/ads', async (req, res) =>{
    let gameId = req.params.id;

    let ads = await getAdsByGameId(gameId)

    return res.status(200).json(ads)
})

router.get('/ads/:id/discord', async (req, res) =>{
    let adsId = req.params.id;

    let discord = await getDiscordByAd(adsId)

    return res.status(200).json(discord)
})

export default router