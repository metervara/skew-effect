import './style.css'
import './skew-effect.css'
import { initSkewEffect } from './skew-effect';
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'


// document.addEventListener("DOMContentLoaded", () => {
window.onload = () => {
  console.log("Dom ready, setting up skew effect");
  const app = document.getElementById("app")!;
  initSkewEffect(app);
};
// });
