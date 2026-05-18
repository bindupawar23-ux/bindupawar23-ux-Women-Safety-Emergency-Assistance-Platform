const checkRisk = (locationHistory) => {
  if (locationHistory.length < 2) return;

  const last = locationHistory[locationHistory.length - 1];
  const prev = locationHistory[locationHistory.length - 2];

  const distance = Math.abs(last.lat - prev.lat) + Math.abs(last.lng - prev.lng);

  if (distance < 0.00001) {
    console.log("⚠️ User might be stuck!");
  }
};

module.exports = checkRisk;