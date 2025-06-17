let targetElement: HTMLElement;
let parentElement: HTMLElement | null;
let requestId: number | null = null;

let wrapper: HTMLElement;
let leftElement: HTMLElement;
let rightElement: HTMLElement;
let leftInnerElement: HTMLElement;
let rightInnerElement: HTMLElement;

let mouseX: number;
let mouseY: number;
let softX: number;
let softY: number;
const ease: number = 0.1;

export const initSkewEffect = (targetEl: HTMLElement): void => {
  targetElement = targetEl;
  parentElement = targetElement.parentElement;
  if(!parentElement) {
    console.error("Target element does not have a parent");
    return;
  }
  // console.log(targetElement);
  createEffectElements();

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", mouse);

  mouseX = window.innerWidth / 2;
  mouseY = window.innerHeight / 2;
  softX = mouseX;
  softY = mouseY;

  resize();

  requestId = requestAnimationFrame(loop);
};

/**
 * Set up dom elements for skewing effect
 */
const createEffectElements = (): void => {
  wrapper = document.createElement("div");
  wrapper.classList.add("skew-wrapper");
  parentElement?.appendChild(wrapper);

  leftElement = document.createElement("div");
  leftElement.classList.add("skew-side", "left");
  wrapper.appendChild(leftElement);

  rightElement = document.createElement("div");
  rightElement.classList.add("skew-side", "right");
  wrapper.appendChild(rightElement);
};

/**
 * Event handlers
 */
const loop = (time: Number): void => {
  softX += (mouseX - softX) * ease;
  softY += (mouseY - softY) * ease;

  wrapper?.style.setProperty("--centerX", `${softX}px`);
  wrapper?.style.setProperty("--centerY", `${softY}px`);

  wrapper?.style.setProperty("--centerNormalizedX", `${(softX / window.innerWidth) * 2 - 1}px`);
  wrapper?.style.setProperty("--centerNormalizedY", `${(softY / window.innerHeight) * 2 - 1}px`); // TODO: MEasure a div using dvh? So it doesn't change when scrolling on mobile

  requestId = requestAnimationFrame(loop);
};

const mouse = (event: MouseEvent): void => {
  mouseX = event.clientX;
  mouseY = event.clientY;
};

const resize = (): void => {
  console.log("resize");
};
