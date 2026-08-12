import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

const container = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

/**
 * Hydrate the prerendered markup rather than replacing it.
 *
 * `npm run build` server-renders the homepage into `#root` (see
 * scripts/prerender.mjs), so in production the container already holds ~130 kB
 * of correct DOM. `createRoot().render()` would discard all of it and rebuild
 * from scratch — wasted work on exactly the low-end phones this site is aimed
 * at, and a visible flash of re-layout.
 *
 * The dev server does not prerender, so the container is empty there and the
 * normal client render path is taken.
 */
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, tree)
} else {
  ReactDOM.createRoot(container).render(tree)
}
