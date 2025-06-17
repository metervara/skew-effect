let targetElement: HTMLElement;
let parentElement: HTMLElement | null;

let wrapper: HTMLElement;
let leftElement: HTMLElement;
let rightElement: HTMLElement;
let leftCloneElement: HTMLElement;
let rightCloneElement: HTMLElement;

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
  createEffectElements();
  targetElement.style.visibility = "hidden";

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", mouse);

  mouseX = window.innerWidth / 2;
  mouseY = window.innerHeight / 2;
  softX = mouseX;
  softY = mouseY;

  resize();

  requestAnimationFrame(loop);
};

/**
 * Set up dom elements for skewing effect
 */
const createEffectElements = (): void => {
  wrapper = document.createElement("div");
  wrapper.classList.add("skew-wrapper");
  parentElement?.appendChild(wrapper);

  // console.log(rect);

  leftElement = document.createElement("div");
  leftElement.classList.add("skew-side", "left");
  leftCloneElement = targetElement.cloneNode(true) as HTMLElement;
  leftCloneElement.classList.add("skew-clone");
  leftElement.appendChild(leftCloneElement);
  wrapper.appendChild(leftElement);

  rightElement = document.createElement("div");
  rightElement.classList.add("skew-side", "right");
  rightCloneElement = targetElement.cloneNode(true) as HTMLElement;
  rightCloneElement.classList.add("skew-clone");
  rightElement.appendChild(rightCloneElement);
  wrapper.appendChild(rightElement);
};

/**
 * Event handlers
 */
const loop = (_: Number): void => {
  softX += (mouseX - softX) * ease;
  softY += (mouseY - softY) * ease;

  wrapper?.style.setProperty("--centerX", `${softX}px`);
  wrapper?.style.setProperty("--centerY", `${softY}px`);
  
  wrapper?.style.setProperty("--centerNormalizedX", `${(softX / window.innerWidth) * 2 - 1}`);
  wrapper?.style.setProperty("--centerNormalizedY", `${(softY / window.innerHeight) * 2 - 1}`); // TODO: MEasure a div using dvh? So it doesn't change when scrolling on mobile

  wrapper?.style.setProperty("--normalizedY", `${(Math.max(0, Math.min(1, softY / window.innerHeight)))}`); // TODO: MEasure a div using dvh? So it doesn't change when scrolling on mobile

  requestAnimationFrame(loop);
};

const mouse = (event: MouseEvent): void => {
  mouseX = event.clientX;
  mouseY = event.clientY;
};

const resize = (): void => {
  console.log("resize");
  const rect = targetElement.getBoundingClientRect();
  
  // console.log(rect.width, rect.height)
  
  leftCloneElement.style.left = `${rect.left}px`;
  leftCloneElement.style.top = `${rect.top}px`;
  leftCloneElement.style.width = `${rect.width}px`;
  leftCloneElement.style.height = `${rect.height}px`;

  rightCloneElement.style.left = `${rect.left}px`;
  rightCloneElement.style.top = `${rect.top}px`;
  rightCloneElement.style.width = `${rect.width}px`;
  rightCloneElement.style.height = `${rect.height}px`;
};
