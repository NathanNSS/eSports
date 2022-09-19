import { getAllGamesDB } from "../model/game_model";


export async function getAllGames() {
    try {

        let games = await getAllGamesDB()

        if (games.length <= 0) throw new Error("Sem dados");

        return games.map(({_count,...game}) => {
            return {
                ...game,
                ads:_count.ads,
            }
        })

    } catch (error) {
        console.log(error)
    }
}