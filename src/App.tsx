import { useState } from 'react'
import './App.css'
import PokemonInput from "./PokemonInput";
import { CountContext } from "./CountContext";

function App() {
  const [count, setCount] = useState(0)

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 32 }}>
        <div className="pokemon-header" style={{ marginBottom: 24 }}>
          <img src="/mainlogo.png" alt="Pokemon Gotta Spell 'Em All" style={{ width: 480, maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', filter: 'drop-shadow(0 0 0 #fff) drop-shadow(0 0 4px #fff) drop-shadow(2px 2px 0 #fff) drop-shadow(-2px -2px 0 #fff) drop-shadow(2px -2px 0 #fff) drop-shadow(-2px 2px 0 #fff)' }} />
        </div>
        <div className="pokemon-bg-wrapper" style={{ width: '100%', maxWidth: 480, margin: '0 auto' }}>
          <PokemonInput />
        </div>
        {/* Counter moved to bottom right with fire symbol */}
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
          <span role="img" aria-label="fire" style={{ fontSize: 24, marginRight: 12 }}>🔥</span>
          <span style={{marginRight: 8}}>Streak:</span>
          {count}
        </div>
      </div>
    </CountContext.Provider>
  )
}

export default App
