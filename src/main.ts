import "./style.css";
import "./skew-effect.css";
import { initSkewEffect } from "./skew-effect";
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// HAck to ensure layout is ready for measuring placement of skew elements
// Was experienceing the elements to be placed at the top, since the measurement happened before centering was applied by css.
window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      console.log("laoded, deffered two animation frames -> setting up skew effect");
      const app = document.getElementById("app")!;
      initSkewEffect(app);
    });
  });
});
