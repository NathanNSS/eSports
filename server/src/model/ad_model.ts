import { prisma } from "../prisma";
import { Ad } from '@prisma/client'


export async function getAdsByGameId_DB(id: string) {
    let ads = await prisma.ad.findMany({
        where: {
            gameId: id
        },
        select: {
            id: true,
            gameId: true,
            name: true,
            yearsPlaying: true,
            discord: false,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,
            createdAt: false,
        },
        orderBy: {
            createdAt: 'asc'
        }
    })
    return ads
}

export async function getDiscordByAd_DB(adId: string) {
    let discord = await prisma.ad.findUniqueOrThrow({
        where: {
            id: adId
        },
        select: {
            discord: true
        }
    })
    return discord
}

export async function createAD_DB({ gameId, data }: { gameId: string, data: Ad }) {
    let resInsert = await prisma.ad.create({
        data: {
            gameId: gameId,
            name: data.name,
            discord: data.discord,
            yearsPlaying: data.yearsPlaying,
            weekDays: data.weekDays,
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: data.useVoiceChannel
        }
    })
    return resInsert
}