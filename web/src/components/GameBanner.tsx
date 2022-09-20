import { InterfaceGame } from "../types/InterfaceGame";

export function GameBanner({ bannerUrl, ads, title }: InterfaceGame) {
    return (
        <a href="!" className="relative rounded-lg overflow-hidden">
            <img src={bannerUrl} alt="game" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 transition-opacity opacity-0 duration-300 ease-out hover:opacity-100">
                <strong className="font-bold text-[15px] text-white overflow-hidden whitespace-nowrap block">{title}</strong>
                <span className="text-zinc-300 text-sm block">{`${ads} anúncio${ads > 1 ? "s" : ""}`}</span>
            </div>
        </a>
    );
}
