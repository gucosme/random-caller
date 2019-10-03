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

module.exports = {
  fromCsv,
};
