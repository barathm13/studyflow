export function playCompletionChime() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const now = ctx.currentTime;
  [523.25, 659.25, 783.99].forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, now + index * 0.12);
    gain.gain.linearRampToValueAtTime(0.12, now + index * 0.12 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.32);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(now + index * 0.12);
    oscillator.stop(now + index * 0.12 + 0.34);
  });
}
