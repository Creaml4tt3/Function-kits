document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    //? Setting
    const TEXT_SELECTOR = ".text-hover-section .text-hover";
    const IMAGE_SELECTOR = ".image_show";
    //? Setting

    let TEXT_HOVER = document.querySelectorAll(`${TEXT_SELECTOR}`);
    let IMAGE_SHOW = document.querySelectorAll(`${IMAGE_SELECTOR}`);
    const DURATION = 0;

    if (TEXT_HOVER) {
      TEXT_HOVER.forEach((SOMETHING, index) => {
        SOMETHING.addEventListener("mousemove", (e) => {
          let OFFSET_X = e.offsetX;
          let OFFSET_Y = e.offsetY;

          IMAGE_SHOW[index].classList.remove("display_none");
          setTimeout(() => {
            IMAGE_SHOW[
              index
            ].style.transform = `translate(${OFFSET_X}px,${OFFSET_Y}px)`;
          }, DURATION);
        });
        SOMETHING.addEventListener("mouseleave", () => {
          IMAGE_SHOW[index].classList.add("display_none");
        });
      });
    }
  }, 10);
});
