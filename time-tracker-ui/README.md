# Source structure

**src/assets**

Assets which are accessed from a React component.

**src/css**

All css files.

**src/types**

Custom types used anywhere in the application. Does not apply to props interfaces used in React components.

**src/util**

Functions, hooks etc. basically anithing which is not a React component.

**src/layout**

React components which are only for layout purposes. Must not contain any state (unless something like _menuOpen_ etc.). Must not contain any input components (unless something like a _Toggle Menu_ button). Can accept react components as props.

**src/interaction**

Components which handle user interaction. Should not hold state but instead only propagate changes via event handler props to its parent.

**src/components**

Components which may hold state. Basically anything which does not fit into _layout_ or _interaction_.

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
