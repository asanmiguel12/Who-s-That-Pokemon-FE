import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import { fetchRandomPokemon } from "./fetchRandomPokemon.ts";
import type { Pokemon } from "./fetchRandomPokemon.ts";
import { CountContext } from "./CountContext";

const PokemonMain: React.FC = () => {
    const [pokemonName, setPokemonName] = useState("");
    const [message, setMessage] = useState("");
    const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);
    const [pikachuImage, setPikachuImage] = useState("/pikachu.png");
    const {count, setCount} = useContext(CountContext);
    const [reveal, setReveal] = useState(false);
    const [hasGuessedCorrectly, setHasGuessedCorrectly] = useState(false);


    useEffect(() => {
        const pokemon = fetchRandomPokemon();
        setRandomPokemon(pokemon);
    }, []);

    useEffect(() => {
        if (randomPokemon)
        {
            axios
                .post(`https://whos-that-pokemon-be.vercel.app/api/pokemon/storeRandomPokemon/${randomPokemon.name}`)
                .catch((error) => console.error("Failed to send Pokémon to the backend:", error));
        }
    }, [randomPokemon]);

    useEffect(() => {
        if (message === "You Got It!")
        {
            // Use a setTimeout to ensure confetti runs after DOM updates
            setTimeout(() => {
                confetti({
                             particleCount: 150, spread: 90, origin: {y: 0.6}
                         });
            }, 0);
        }
        // Reset counter if message is a fail
        if (message === "Hmm Try Again!" || message === "You Didn't Make A Guess, Try Again!")
        {
            setCount(0);
        }
    }, [message]);

    const checkPokemon = async () => {
        setPikachuImage("/pikachu%20thunderbolt.png");
        setReveal(true);
        setTimeout(() => setPikachuImage("/pikachu.png"), 1200);
        try {
            const response = await axios.get(`https://https://whos-that-pokemon-be.onrender.com/api/pokemon/checkRandomPokemon/${pokemonName}`);
            if (response.data.correct === true) {
                if (!hasGuessedCorrectly) {
                    setMessage("You Got It!");
                    setCount((c: number) => c + 1);
                    setHasGuessedCorrectly(true);
                    axios.post(`https://whos-that-pokemon-be.onrender.com/api/pokemon/updateStreak/${count + 1}`)
                        .catch((error) => console.error("Failed to update streak:", error));
                } else {
                    setMessage("Press Next Pokémon to Continue!");
                }
            } else {
                setMessage("Hmm Try Again!");
            }
        } catch (error) {
            setMessage("You Didn't Make A Guess, Try Again!");
            console.error(error);
        }
    };

    const resetGame = () => {
        if (!pokemonName) {
            setCount(0);
        }
        setRandomPokemon(fetchRandomPokemon());
        setPokemonName("");
        setMessage("");
        setHasGuessedCorrectly(false); // Reset for the next Pokémon
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonName(e.target.value);
        setReveal(false); // Reset reveal state on new input
    };

    return (<div
            style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {randomPokemon && (<div
                    style={{
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        background: '#fff',
                        boxShadow: '0 0 32px 0 #0074ff44',
                        border: '8px solid #3264e6',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                        padding: 0,
                    }}
                >
                    <img
                        src={randomPokemon.imagePath}
                        alt={randomPokemon.name}
                        style={{
                            width: 180,
                            height: 180,
                            objectFit: 'contain',
                            borderRadius: '0%',
                            filter: message === 'You Got It!' ? 'none' : 'brightness(0)',
                        }}
                    />
                </div>)}
            <img
                src="/wtp%20main%20main%20.png"
                alt="Who's that Pokemon?!"
                style={{
                    width: 420,
                    height: 'auto',
                    display: 'block',
                    marginBottom: 300,
                    filter: 'drop-shadow(0 0 2px #fff) drop-shadow(0 0 4px #fff) drop-shadow(1px 1px 0 #fff) drop-shadow(-1px -1px 0 #fff)',
                }}
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 520,
                    margin: '0 auto',
                    gap: '8px',
                    marginTop: 0,
                }}
            >
                {message && (<div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '30%',
                            transform: 'translate(-50%, -50%)',
                            background: '#fff',
                            border: '4px solid #3264e6',
                            borderRadius: 24,
                            boxShadow: '0 0 32px 0 #3264e688',
                            padding: '28px 56px',
                            fontWeight: 900,
                            fontFamily: 'Impact, "Pokemon Solid", "Arial Black", Arial, sans-serif',
                            fontSize: 38,
                            color: '#ffe600',
                            textShadow: '2px 2px 0 #3264e6, 4px 4px 0 #3264e6',
                            zIndex: 1000,
                            minWidth: 220,
                            textAlign: 'center',
                            letterSpacing: 2,
                            transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
                        }}
                    >
                        {message}
                    </div>)}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <input
                        type="text"
                        placeholder="Type Pokemon Name"
                        value={pokemonName}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter')
                            {
                                checkPokemon();
                            }
                        }}
                        style={{
                            fontSize: '1.4em',
                            padding: '0.8em 1.5em',
                            width: 520,
                            borderRadius: 32,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            border: '4.5px solid #0074ff',
                            outline: 'none',
                            marginTop: '-400px',
                        }}
                    />
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                        {randomPokemon?.name?.toUpperCase() &&
                            randomPokemon.name.split('').map((char, index) => (
                                <div
                                    key={index}
                                    style={{
                                        backgroundColor: reveal
                                            ? pokemonName[index]?.toUpperCase() === char.toUpperCase()
                                                ? '#4be04b' // Green for correct letters
                                                : pokemonName[index]
                                                    ? '#e22520' // Red for incorrect letters
                                                    : '#fff' // Default background
                                            : '#fff', // Default before reveal
                                        border: '4.5px solid #0074ff',
                                        borderRadius: 12,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        color: '#000',
                                        fontSize: '1.4em',
                                        fontFamily: 'Impact, "Pokemon Solid", "Arial Black", Arial, sans-serif',
                                        fontWeight: 'bold',
                                        padding: '1em',
                                        textAlign: 'center',
                                        height: 12,
                                        width: 20,
                                    }}
                                >
                                    {pokemonName[index] || ''}
                                </div>
                            ))}
                    </div>;
                    <div
                        style={{
                            display: 'flex', flexDirection: 'row', gap: 12, width: '100%', justifyContent: 'center', marginTop: -20,
                        }}
                    >
                        <button
                            onClick={checkPokemon}
                            style={{
                                fontSize: '1.2em',
                                padding: '0.6em 1.2em',
                                fontWeight: 700,
                                borderRadius: 32,
                                backgroundColor: '#0074ff',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                marginTop: 16,
                                marginBottom: 10,
                            }}
                        >
                            Check Answer
                        </button>
                        <button
                            onClick={resetGame}
                            style={{
                                fontSize: '1.2em',
                                padding: '0.6em 1.2em',
                                borderRadius: 32,
                                backgroundColor: '#0074ff',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                marginTop: 16,
                                marginBottom: 10,
                                fontWeight: 700,
                            }}
                        >
                            Next Pokémon
                        </button>
                    </div>
                    <img
                        src={pikachuImage}
                        alt="Pikachu"
                        style={{
                            width: 108, height: 108, imageRendering: 'pixelated', display: 'block', marginTop: -310, marginRight: -400, transition: 'transform 0.4s ease-in-out',
                        }}
                    />
                </div>
            </div>
        </div>);
}
export default PokemonMain;