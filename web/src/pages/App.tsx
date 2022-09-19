/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from "react";
import { GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import logo from "../assets/logo-nlw-esports.png";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { Input } from "../components/Form/Input";
import { GameBanner } from "../components/GameBanner";

import "../styles/main.css";
import { api } from "../server/api";
import { InterfaceGame } from "../types/InterfaceGame";

export default function App() {
    const [games, setGames] = useState<Array<InterfaceGame>>([]);

    useEffect(() => {
        api({
            route: "/games",
            header: {
                method: "GET",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                mode: "cors",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            })
            .then((data) => setGames(data))
            .catch((err) => console.log(err));
    });
    return (
        <section className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <img src={logo} alt="Logo" />

            <h1 className="mt-20 text-6xl text-white font-black">
                Seu
                <span className="bg-text-gradinet bg-clip-text text-transparent">duo</span>
                está aqui.
            </h1>

            <main className="grid grid-cols-6 gap-6 mt-16">
                {games.map((game) => (
                    <GameBanner key={game.id} title={game.title} ads={game.ads} bannerUrl={game.bannerUrl} />
                ))}
            </main>
            <Dialog.Root>
                <CreateAdBanner />
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/60 inset-0 fixed">
                        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                            <Dialog.Title>Publique um anúncio</Dialog.Title>
                            <form className="mt-8 flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Input Title="Qual o game?" ID="game" placeholder="Selecione o game que deseja jogar" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Input Title="Seu nome (ou nickname)" ID="name" placeholder="Como te chamam dentro do game?" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <Input type="number" ID="yearsPlaying" Title="Joga há quantos anos?" placeholder="Tudo bem ser ZERO" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Input type="text" ID="discord" Title="Qual seu Discord?" placeholder="Usuario #0000" />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="weekDays">Quando costuma jogar?</label>
                                        <div className="grid self-start grid-cols-5 gap-1">
                                            <button title="Domingo" type="button" className="w-8 h-8 rounded bg-zinc-900">
                                                D
                                            </button>
                                            <button title="Segunda" type="button" className="w-8 h-8 rounded bg-zinc-900">
                                                S
                                            </button>
                                            <button title="Terça" type="button" className="w-8 h-8 rounded bg-zinc-900">
                                                T
                                            </button>
                                            <button title="Quarta" type="button" className="w-8 h-8 rounded bg-zinc-900">
                                                Q
                                            </button>
                                            <button title="Quinta" type="button" className="w-8 h-8 rounded bg-zinc-900">
                                                Q
                                            </button>
                                            <button title="Sexta" type="button" className="w-8 h-8 rounded bg-zinc-900">
                                                S
                                            </button>
                                            <button title="Sábado" type="button" className="w-8 h-8 rounded bg-zinc-900">
                                                S
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label htmlFor="hourStart">Qual o horário do dia?</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input type="time" ID="hourStart" placeholder="De" />
                                            <Input type="time" ID="hourEnd" placeholder="Até" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 flex gap-2 text-sm">
                                    <Input type="checkbox" ID="connect" />
                                    <label htmlFor="connect">Costumo me conectar ao chat de voz</label>
                                </div>
                                <footer className="flex justify-end gap-4 mt-4">
                                    <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                                        Cancelar
                                    </Dialog.Close>
                                    <button
                                        type="submit"
                                        className="flex items-center px-5 h-12 font-semibold gap-3 rounded-md bg-violet-500 hover:bg-violet-600"
                                    >
                                        <GameController size={24} /> Encontrar o duo
                                    </button>
                                </footer>
                            </form>
                        </Dialog.Content>
                    </Dialog.Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        </section>
    );
}
