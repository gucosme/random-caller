function fromCsv(content) {
  const [head, ...lines] = content
    .split('\r\n')
    .map((line) => line.split(','));

  const entries = lines.map(
    (line) => line.map((item, index) => [head[index], item]),
  );

  return entries.map((entry) => Object.assign(
    {},
    ...Array.from(entry, ([k, v]) => ({ [k]: v })),
  ));
}

function genWinner(min, max, except = []) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (except.includes(num)) return genWinner(min, max, except);
  return num;
}

function pickWinners(participants) {
  const max = participants.length - 1;
  const winner1 = genWinner(0, max);
  const winner2 = genWinner(0, max, [winner1]);
  const winner3 = genWinner(0, max, [winner1, winner2]);
  const winner4 = genWinner(0, max, [winner1, winner2, winner3]);

  return [
    participants[winner1],
    participants[winner2],
    participants[winner3],
    participants[winner4],
  ];
}

module.exports = {
  fromCsv,
  pickWinners,
};
