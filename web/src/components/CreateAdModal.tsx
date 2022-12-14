/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { GameController, Check } from "phosphor-react";

import { Input } from "./Form/Input";
import { InterfaceGame } from "../types/InterfaceGame";
import { api } from "../server/api";

interface Props {
    games: InterfaceGame[];
}

export function CreateAdModal({ games }: Props) {
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            await api.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                // eslint-disable-next-line object-shorthand
                useVoiceChannel: useVoiceChannel,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed">
                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                    <Dialog.Title className="font-bold text-xl text-center">Publique um anúncio</Dialog.Title>
                    <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="game" className="font-semibold">
                                Qual o game?
                            </label>
                            <select
                                name="game"
                                id="game"
                                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                                defaultValue=""
                            >
                                <option disabled value="">
                                    Selecione o game que deseja jogar
                                </option>

                                {games.map((game) => {
                                    return (
                                        <option key={game.id} value={game.id}>
                                            {game.title}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input Title="Seu nome (ou nickname)" name="name" ID="name" placeholder="Como te chamam dentro do game?" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <Input
                                    type="number"
                                    ID="yearsPlaying"
                                    name="yearsPlaying"
                                    min={0}
                                    max={30}
                                    Title="Joga há quantos anos?"
                                    placeholder="Tudo bem ser ZERO"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input type="text" ID="discord" name="discord" Title="Qual seu Discord?" placeholder="Usuario #0000" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex flex-col gap-2">
                                <label>Quando costuma jogar?</label>
                                <ToggleGroup.Root
                                    type="multiple"
                                    className="grid self-start grid-cols-5 gap-1"
                                    onValueChange={setWeekDays}
                                    value={weekDays}
                                >
                                    <ToggleGroup.Item
                                        title="Domingo"
                                        type="button"
                                        className={`w-8 h-8 rounded ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"}`}
                                        value="0"
                                    >
                                        D
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        title="Segunda"
                                        type="button"
                                        className={`w-8 h-8 rounded ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"}`}
                                        value="1"
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        title="Terça"
                                        type="button"
                                        className={`w-8 h-8 rounded ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"}`}
                                        value="2"
                                    >
                                        T
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        title="Quarta"
                                        type="button"
                                        className={`w-8 h-8 rounded ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"}`}
                                        value="3"
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        title="Quinta"
                                        type="button"
                                        className={`w-8 h-8 rounded ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"}`}
                                        value="4"
                                    >
                                        Q
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        title="Sexta"
                                        type="button"
                                        className={`w-8 h-8 rounded ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"}`}
                                        value="5"
                                    >
                                        S
                                    </ToggleGroup.Item>
                                    <ToggleGroup.Item
                                        title="Sábado"
                                        type="button"
                                        className={`w-8 h-8 rounded ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"}`}
                                        value="6"
                                    >
                                        S
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label htmlFor="hourStart">Qual o horário do dia?</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input type="time" ID="hourStart" name="hourStart" placeholder="De" />
                                    <Input type="time" ID="hourEnd" name="hourEnd" placeholder="Até" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 flex gap-2 text-sm">
                            <Checkbox.Root
                                id="voice"
                                name="voice"
                                checked={useVoiceChannel}
                                onCheckedChange={(checked) => {
                                    if (checked === true) {
                                        setUseVoiceChannel(true);
                                    } else {
                                        setUseVoiceChannel(false);
                                    }
                                }}
                                className="w-6 h-6 p-1 rounded bg-zinc-900"
                            >
                                <Checkbox.Indicator>
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>

                            <label htmlFor="voice">Costumo me conectar ao chat de voz</label>
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
    );
}
