# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
# Clima SKT – Weather App

Welcome to **Clima SKT**!  
A beginner-friendly weather app built with modern web technologies:

- **React** & **TypeScript** – Robust, type-safe UI development
- **Vite** – Lightning-fast tooling and HMR
- **TanStack Query** – Effortless data fetching and caching
- **shadcn/ui** – Beautiful, accessible UI components
- **Tailwind CSS** – Rapid, utility-first styling

---

## 🚀 Getting Started

1. **Install dependencies**
  ```bash
  npm install
  ```
2. **Start the development server**
  ```bash
  npm run dev
  ```
3. **Build for production**
  ```bash
  npm run build
  ```

---

## ✨ Features

- 🌦️ Real-time weather data fetching
- ⚡ Fast, responsive UI with shadcn/ui and Tailwind CSS
- 🔄 Data fetching & caching via TanStack Query
- 🛠️ Type safety with TypeScript
- 🚀 Instant reloads with Vite

---

## 📚 Useful Resources

- [React Documentation](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

---

## 📝 ESLint & Code Quality

This project uses ESLint with recommended TypeScript and React rules.  
You can further enhance linting by adding plugins like `eslint-plugin-react-x` and `eslint-plugin-react-dom`.

---

Happy coding! 🎉  
Feel free to explore, experiment, and make it your own.

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
