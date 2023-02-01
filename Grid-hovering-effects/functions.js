document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const OFFSET = 300; //? radius of effects
    const GRID_CONTAINER = "test_grid";
    const GRID_ITEMS = "test_items";
    const PERCENT_X = "80%";
    const PERCENT_Y = "80%";
    const COLOR_1 = "rgba(241, 23, 18, 1)";
    const COLOR_2 = "rgba(0, 153, 247, 1)";
    const COLOR_3 = "rgba(255, 255, 255, 0)";
    const BORDER_WIDTH = "2px";
    const angles = []; //in deg
    for (let i = 0; i <= 360; i += 45) {
      angles.push((i * Math.PI) / 180);
    }
    let nearBy = [];

    function clearNearBy() {
      nearBy
        .splice(0, nearBy.length)
        .forEach((e) => (e.style.borderImage = null));
    }

    document.querySelectorAll(`.${GRID_ITEMS}`).forEach((b) => {
      b.addEventListener("mouseleave", (e) => {
        e.target.style.borderImage = null;
        e.target.style.border = "1px solid transparent";
      });

      b.addEventListener("mouseenter", () => {
        clearNearBy();
      });

      b.addEventListener("mousemove", (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top; //y position within the element.
        e.target.style.borderImage = `radial-gradient(${PERCENT_X} ${PERCENT_Y} at ${x}px ${y}px ,${COLOR_1},${COLOR_2},${COLOR_3}) 9 / ${BORDER_WIDTH} / 0px stretch `;
      });
    });

    const body = document.querySelector(`.${GRID_CONTAINER}`);

    body.addEventListener("mousemove", (e) => {
      const x = e.x; //x position within the element.
      const y = e.y; //y position within the element.

      clearNearBy();
      nearBy = angles.reduce((acc, rad, i, arr) => {
        const cx = Math.floor(x + Math.cos(rad) * OFFSET);
        const cy = Math.floor(y + Math.sin(rad) * OFFSET);
        const element = document.elementFromPoint(cx, cy);

        if (element !== null) {
          // console.log("cursor at ", x, y, "element at ", cx, cy, element);
          if (
            element.className === GRID_ITEMS &&
            acc.findIndex((ae) => ae.id === element.id) < 0
          ) {
            const brect = element.getBoundingClientRect();
            const bx = x - brect.left; //x position within the element.
            const by = y - brect.top; //y position within the element.
            if (!element.style.borderImage)
              element.style.borderImage = `radial-gradient(${OFFSET * 2}px ${
                offset * 2
              }px at ${bx}px ${by}px ,rgba(255,255,255,0.7),rgba(255,255,255,0.1),transparent ) 9 / 1px / 0px stretch `;
            return [...acc, element];
          }
        }
        return acc;
      }, []);
    });

    body.onmouseleave = (e) => {
      clearNearBy();
    };
  }, 10);
});
