import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/**
 * Server-render entry point, used only by scripts/prerender.mjs at build time.
 *
 * Note it does not import the stylesheet — Vite emits that from the client
 * build and the prerenderer only wants markup.
 */
export function render() {
  return renderToString(<App />)
}
