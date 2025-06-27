export function hashString(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  if (h === 0) h = 0xdeadbeef;

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let code = '';

  for (let i = 0; i < 16; i++) {
    h ^= h << 13;
    h >>>= 0;
    h ^= h >>> 17;
    h ^= h << 5;
    h >>>= 0;

    code += alphabet[h % 26];
  }
  return code;
}
