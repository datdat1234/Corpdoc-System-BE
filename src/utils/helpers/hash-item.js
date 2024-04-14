import base64 from 'base-64';
import { saltHash } from '#root/config/index.js';

const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random()
      * (max - min + 1)) + min;
};

export async function encodeItem(data) {
  let hash = base64.encode(data);
  const countToInsert = randomNumberInRange(2,5);
  for (let i = 0; i < countToInsert; i++) {
    let position = randomNumberInRange(0, hash.length);
    hash = [hash.slice(0, position), saltHash, hash.slice(position)].join('');
  }
  hash = base64.encode(hash);
  return hash;
}

export async function decodeItem(data) {
  let item = base64.decode(data);
  while (item.search(saltHash) !== -1) {
    item = item.replace(saltHash, '')
  }
  item = base64.decode(item);
  return item;
}
