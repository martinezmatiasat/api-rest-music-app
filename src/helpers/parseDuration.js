const parseDuration = (input) => {
  // Admite formatos: "3:45", "3.45", "3,45"
  const normalized = input.replace(',', ':').replace('.', ':');
  const parts = normalized.split(':');
  if (parts.length !== 2) return null;
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  if (
    isNaN(minutes) || isNaN(seconds) ||
    minutes < 0 || seconds < 0 || seconds > 59
  ) return null;
  return minutes * 60 + seconds;
};

const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

module.exports = {
  parseDuration,
  formatDuration
};
