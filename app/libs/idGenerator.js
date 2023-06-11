function idGenerator(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let customerId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    customerId += characters.charAt(randomIndex);
  }

  return customerId;
}

module.exports = idGenerator;
