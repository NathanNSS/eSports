import { createAD_DB, getAdsByGameId_DB, getDiscordByAd_DB } from "../model/ad_model";
import { convertHourToMinutes, convertMinutesToHour } from "../utils/time_convert";

export async function getAdsByGameId(id: string) {
    try {
        let ads = await getAdsByGameId_DB(id)

        if (ads[0]) {
            return ads.map(item => {
                return {
                    ...item,
                    weekDays: item.weekDays.split(","),
                    hourEnd: convertMinutesToHour(item.hourEnd),
                    hourStart: convertMinutesToHour(item.hourStart),
                }
            })
        }
        return ads
    } catch (error) {
        console.log(error)
    }
}

export async function getDiscordByAd(adId: string) {
    try {
        let discord = await getDiscordByAd_DB(adId)
        return discord
    } catch (error) {
        console.log(error)
    }
}

export async function createAd({ gameId, data }: { gameId: string, data: any }) {
    try {
        if(!data) throw new Error("Dados vazios");
        
        data.weekDays = data.weekDays.join(",")
        data.hourStart = convertHourToMinutes(data.hourStart)
        data.hourEnd = convertHourToMinutes(data.hourEnd)

        let resInsert = await createAD_DB({ gameId, data })

        return resInsert

    } catch (error) {
        console.log(error)
    }
}