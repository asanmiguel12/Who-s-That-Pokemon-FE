# Who's That Pokémon? (React + TypeScript + Vite)

Welcome to "Who's That Pokémon?" — a fun web game where you guess the Pokémon based on their silhouette! This app challenges your Pokémon knowledge and your spelling skills.

## How to Play

- A random Pokémon silhouette is shown on the screen.
- Type your guess for the Pokémon's name in the input box.
- You must spell the name correctly to get it right!
- If you guess correctly, you'll see the full Pokémon image and can try another.
- Try to guess as many as you can!

## Features

- 100s of Pokémon silhouettes to guess from.
- Instant feedback on your guess.
- Encourages correct spelling of Pokémon names.
- Clean, responsive interface built with React, TypeScript, and Vite.

## Screenshots

<img src="./Screenshot%202025-06-22%20at%204.43.33%E2%80%AFPM.png" alt="Game silhouette view" width="600" />

<img src="./Screenshot%202025-06-22%20at%204.48.38%E2%80%AFPM.png" alt="Correct answer view" width="600" />

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser to the local address shown in the terminal.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
