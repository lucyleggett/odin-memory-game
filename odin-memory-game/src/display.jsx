const cardWrappers = document.querySelectorAll(".card-wrapper");

cardWrappers.forEach((wrapper) =>
  wrapper.addEventListener("mousemove", (e) => {
    const card = wrapper.querySelector(".card");
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = x - rect.width / 2;
    const yc = y - rect.height / 2;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    card.style.setProperty("--x", `${px}%`);
    card.style.setProperty("--y", `${py}%`);
    card.style.setProperty("--rx", `${-yc / 10}deg`);
    card.style.setProperty("--ry", `${xc / 10}deg`);
    card.style.setProperty("--o", "1");
  }),
);

cardWrappers.forEach((wrapper) =>
  wrapper.addEventListener("mouseleave", () => {
    const card = wrapper.querySelector(".card");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--o", "0");
  }),
);