const limit = 10;

for (let i = 0; i < limit; i++) {
  const num = Math.floor(Math.random() * 11 + 10);
  await new Promise((r) => setTimeout(r, 2000));
  console.log(num ? num : num + Math.floor(Math.random() * 11));
}
