import { useEffect, useState } from "react";

const images = [
  "/backgrounds/dune.webp",
  "/backgrounds/fightclub.webp",
  "/backgrounds/flow.webp",
  "/backgrounds/godfather.webp",
  "/backgrounds/interestellar.webp",
  "/backgrounds/parasite.webp",
  "/backgrounds/pulpfiction.webp",
  "/backgrounds/schindlerlist.webp",
  "/backgrounds/spaceodyssey.webp",
  "/backgrounds/starwars.webp",
  "/backgrounds/everything.jpg",
  "/backgrounds/lalaland.jpg"
];



export default function Home(){
    const [bgImage, setBgImage] = useState(images[Math.floor(Math.random() * images.length)]);

    useEffect(() => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setBgImage(randomImage);
    }, []);

    return (
        <div className={`relative bg-cover bg-center h-[100dvh] overflow-hidden flex items-center justify-center`} 
        style={{ backgroundImage: `url('${bgImage}')` }}
        >
            <div className="absolute inset-0 bg-black/30 z-0"></div>
            <section className="relative flex items-center justify-center w-full h-full">

                <div className="relative text-center">
                    <p className="font-Anton text-[12vw] uppercase text-white/80 tracking-wider select-none leading-none">
                    Your Movies
                    </p>
                    <p className="font-allura text-[#F61308] text-[15vw] leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-5deg]">
                    App
                    </p>
                </div>

                <button className="absolute bottom-40 px-4 py-3 text-white text-4xl font-extralight hover:bg-white/20 hover:text-black transition rounded-full backdrop-blur-sm bg-black/20 border border-white/10 shadow-[inset_0_0_5px_rgba(255,255,255,0.1),_0_0_10px_rgba(255,255,255,0.2)]">
                    <a href="/movies">Go to movies</a>
                </button>

            </section>
        </div>
    );
}