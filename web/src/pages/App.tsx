/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import logo from "../assets/logo-nlw-esports.png";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { GameBanner } from "../components/GameBanner";

import "../styles/main.css";
import { api } from "../server/api";
import { InterfaceGame } from "../types/InterfaceGame";
import { CreateAdModal } from "../components/CreateAdModal";

export default function App() {
    const [games, setGames] = useState<Array<InterfaceGame>>([]);

    useEffect(() => {
        async function getGames() {
            try {
                const games = await api.get("/games");
                setGames(games.data);
            } catch (error) {
                console.log(error);
            }
        }

        getGames();
    }, []);
    return (
        <section className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <img src={logo} alt="Logo" />

            <h1 className="mt-20 text-6xl text-white font-black">
                Seu
                <span className="bg-text-gradinet bg-clip-text text-transparent"> duo </span>
                está aqui.
            </h1>

            <main className="grid grid-cols-6 gap-6 mt-16">
                {games.map((game) => (
                    <GameBanner key={game.id} title={game.title} ads={game.ads} bannerUrl={game.bannerUrl} />
                ))}
            </main>
            <Dialog.Root>
                <CreateAdBanner />
                <CreateAdModal games={games} />
            </Dialog.Root>
        </section>
    );
}
