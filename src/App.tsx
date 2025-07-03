import {useEffect, useState} from 'react'
import './App.css'
import PokemonMain from "./PokemonMain.tsx";
import { CountContext } from "./CountContext";

function App() {
  const [count, setCount] = useState(0)

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'hidden';
        };
    }, []);

  return (<CountContext.Provider value={{count, setCount}}>
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 32
    }}>
      <div className="pokemon-header" style={{marginBottom: 24}}>
        <img src="/mainlogo.png" alt="Pokemon Gotta Spell 'Em All" style={{
          width: 480,
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
          filter: 'drop-shadow(0 0 0 #fff) drop-shadow(0 0 4px #fff) drop-shadow(2px 2px 0 #fff) drop-shadow(-2px -2px 0 #fff) drop-shadow(2px -2px 0 #fff) drop-shadow(-2px 2px 0 #fff)'
        }}/>
      </div>
      <div className="pokemon-bg-wrapper" style={{width: '100%', maxWidth: 480, margin: '0 auto'}}>
        <PokemonMain/>
      </div>
      <div style={{
        position: 'fixed',
        right: 32,
        bottom: 32,
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 32,
        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        fontSize: 24,
        fontWeight: 700,
        color: '#ff5722',
        zIndex: 9999
      }}>
        <span role="img" aria-label="fire" style={{fontSize: 24, marginRight: 12}}>🔥</span>
        <span style={{marginRight: 8}}>Streak:</span>
        {count}
      </div>
    </div>
    <div style={{ position: 'fixed', top: '78%', right: '612px', transform: 'translateY(-50%)', zIndex: 9999, overflow: 'inherit' }}>
      <div
          style={{
            position: 'relative', display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement | null;
            if (tooltip) tooltip.style.visibility = 'visible';
          }}
          onMouseLeave={(e) => {
            const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement | null;
            if (tooltip) tooltip.style.visibility = 'hidden';
          }}
      >
        <button
            style={{
              background: 'rgba(0,116,255,0.7)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 30,
              height: 30,
              fontSize: 12,
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              position: 'fixed',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
        >
          i
        </button>
        <div
            className="tooltip"
            style={{
              visibility: 'hidden',
              backgroundColor: '#fff',
              color: '#000',
              textAlign: 'center',
              borderRadius: 8,
              padding: '8px 12px',
              position: 'absolute',
              bottom: '120%',
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 1,
              width: 200,
              fontSize: 14,
              whiteSpace: 'wrap',
            }}
        >
          Try spelling the Pokémon silhouette correctly! Use the boxes below to help you! Try your best to get the highest streak possible!<br/>
        </div>
      </div>
    </div>
  </CountContext.Provider>)
}

export default App
