import Oyunum from "./game/Oyunum";

const baslatmaBtn: HTMLElement | null = document.querySelector('#baslat');
baslatmaBtn?.addEventListener('click', () => {
  new Oyunum("GLCanvas");
});
