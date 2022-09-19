import { prisma } from "../prisma";
import { Game } from '@prisma/client'


export async function getAllGamesDB(){
    let games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                },
            },
        }
    })

    return games
}