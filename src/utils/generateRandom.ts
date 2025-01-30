export function generateRandomRef() {
  let length = 3;

  const num = String(Math.floor(1000 + Math.random() * 1000));

  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return 'USR-' + num + '-' + result;
}
