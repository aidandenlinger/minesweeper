import './App.scss'
import App from './App.svelte'

const appElement = document.getElementById('app')

if (appElement == null) {
  throw new Error("No html element with id 'app'!")
}

const app = new App({
  target: appElement,
})

export default app
