import { colord, extend } from "colord";
import labPlugin from "colord/plugins/lab";

extend([labPlugin]);

const getRand = (max) => Math.floor(Math.random() * (max + 1));

export const getRandomRGB = () => [getRand(255), getRand(255), getRand(255)];

export const hsl2safari = (h, s, l, model = "rgb") => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return model === "rgb" ? 255 * color : Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return model === "rgb" ? `rgb(${f(0)},${f(8)},${f(4)})` : `#${f(0)}${f(8)}${f(4)}`;
}

export const getColorDelta = (target, guess) => {
  const t = colord(target);
  const g = colord(guess);

  if (!t.isValid() || !g.isValid()) {
    alert("Error")
    return;
  }

  const deltaPrecent = (1 - t.delta(g)) * 100;
  const deltaPrecentClamped = deltaPrecent < 0 ? 0 : deltaPrecent > 100 ? 100 : deltaPrecent;
  return Number(deltaPrecentClamped.toFixed(2))
}