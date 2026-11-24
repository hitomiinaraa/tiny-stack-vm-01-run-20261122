// Tiny stack VM v2 for make.fun's tiny stack ISA.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
const I = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const O = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
function run(p: Buffer, g: Buffer): [Uint8Array, number] {
  const n = p.length, s = new Int32Array(256), m = new Int32Array(256), c = new Int32Array(64), o = new Uint8Array(65536);
  let sp = 0, cp = 0, pc = 0, st = 0, ip = 0, ol = 0, a = 0, b = 0, t = 0, w = '';
  const d = (e: number) => [o.subarray(0, ol), e];
  for (;;) {
    if (st >= 1e6) return d(10);
    if (pc < 0 || pc >= n) return d(9);
    const op = p[pc];
    st++;
    switch (op) {
      case 0: return d(0);
      case 1:
        if (pc + 1 >= n) return d(9);
        if (sp > 255) return d(3);
        s[sp++] = (p[pc + 1] << 24) >> 24; pc += 2; break;
      case 2:
        if (pc + 4 >= n) return d(9);
        if (sp > 255) return d(3);
        s[sp++] = p[pc + 1] | (p[pc + 2] << 8) | (p[pc + 3] << 16) | (p[pc + 4] << 24); pc += 5; break;
      case 3:
        if (sp < 1) return d(2);
        sp--; pc++; break;
      case 4:
        if (sp < 1) return d(2);
        if (sp > 255) return d(3);
        s[sp] = s[sp - 1]; sp++; pc++; break;
      case 5:
        if (sp < 2) return d(2);
        t = s[sp - 1]; s[sp - 1] = s[sp - 2]; s[sp - 2] = t; pc++; break;
      case 6:
        if (sp < 2) return d(2);
        if (sp > 255) return d(3);
        s[sp] = s[sp - 2]; sp++; pc++; break;
      case 7:
        if (sp < 3) return d(2);
        t = s[sp - 3]; s[sp - 3] = s[sp - 2]; s[sp - 2] = s[sp - 1]; s[sp - 1] = t; pc++; break;
      case 16:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = (s[sp - 1] + b) | 0; pc++; break;
      case 17:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = (s[sp - 1] - b) | 0; pc++; break;
      case 18:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = Math.imul(s[sp - 1], b); pc++; break;
      case 19:
        if (sp < 2) return d(2);
        b = s[--sp]; a = s[sp - 1];
        if (b === 0) return d(4);
        s[sp - 1] = (a / b) | 0; pc++; break;
      case 20:
        if (sp < 2) return d(2);
        b = s[--sp]; a = s[sp - 1];
        if (b === 0) return d(4);
        s[sp - 1] = (a % b) | 0; pc++; break;
      case 21:
        if (sp < 2) return d(2);
        b = s[--sp]; a = s[sp - 1];
        if (b === 0) return d(4);
        s[sp - 1] = ((a >>> 0) / (b >>> 0)) | 0; pc++; break;
      case 22:
        if (sp < 2) return d(2);
        b = s[--sp]; a = s[sp - 1];
        if (b === 0) return d(4);
        s[sp - 1] = ((a >>> 0) % (b >>> 0)) | 0; pc++; break;
      case 23:
        if (sp < 1) return d(2);
        s[sp - 1] = (-s[sp - 1]) | 0; pc++; break;
      case 24:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = s[sp - 1] & b; pc++; break;
      case 25:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = s[sp - 1] | b; pc++; break;
      case 26:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = s[sp - 1] ^ b; pc++; break;
      case 27:
        if (sp < 1) return d(2);
        s[sp - 1] = ~s[sp - 1]; pc++; break;
      case 28:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = s[sp - 1] << b; pc++; break;
      case 29:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = s[sp - 1] >> b; pc++; break;
      case 30:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = (s[sp - 1] >>> b) | 0; pc++; break;
      case 32:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = s[sp - 1] === b ? 1 : 0; pc++; break;
      case 33:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = s[sp - 1] < b ? 1 : 0; pc++; break;
      case 34:
        if (sp < 2) return d(2);
        b = s[--sp]; s[sp - 1] = (s[sp - 1] >>> 0) < (b >>> 0) ? 1 : 0; pc++; break;
      case 48:
        if (pc + 2 >= n) return d(9);
        t = ((p[pc + 1] | (p[pc + 2] << 8)) << 16) >> 16; pc = pc + 3 + t; break;
      case 49:
        if (pc + 2 >= n) return d(9);
        if (sp < 1) return d(2);
        t = ((p[pc + 1] | (p[pc + 2] << 8)) << 16) >> 16; pc = s[--sp] === 0 ? pc + 3 + t : pc + 3; break;
      case 50:
        if (pc + 2 >= n) return d(9);
        if (sp < 1) return d(2);
        t = ((p[pc + 1] | (p[pc + 2] << 8)) << 16) >> 16; pc = s[--sp] !== 0 ? pc + 3 + t : pc + 3; break;
      case 51:
        if (pc + 2 >= n) return d(9);
        if (cp >= 64) return d(7);
        c[cp++] = pc + 3; pc = p[pc + 1] | (p[pc + 2] << 8); break;
      case 52:
        if (cp < 1) return d(8);
        pc = c[--cp]; break;
      case 64:
        if (sp < 1) return d(2);
        a = s[sp - 1];
        if (a < 0 || a > 255) return d(6);
        s[sp - 1] = m[a]; pc++; break;
      case 65:
        if (sp < 2) return d(2);
        a = s[--sp]; b = s[--sp];
        if (a < 0 || a > 255) return d(6);
        m[a] = b; pc++; break;
      case 80:
        if (sp < 1) return d(2);
        w = String(s[--sp]);
        if (ol + w.length > 65536) return d(11);
        for (let i = 0; i < w.length; i++) o[ol++] = w.charCodeAt(i);
        pc++; break;
      case 81:
        if (sp < 1) return d(2);
        if (ol >= 65536) return d(11);
        o[ol++] = s[--sp] & 255; pc++; break;
      case 82:
        if (sp > 255) return d(3);
        s[sp++] = ip < g.length ? g[ip++] : -1; pc++; break;
      case 83:
        if (sp < 1) return d(2);
        return d(s[--sp] & 255);
      default:
        return d(5);
    }
  }
}
for (const id of readdirSync(I).sort()) {
  let q;
  try {
    q = readFileSync(I + '/' + id + '/program.bin');
  } catch {
    continue;
  }
  let g;
  try {
    g = readFileSync(I + '/' + id + '/input.bin');
  } catch {
    g = Buffer.alloc(0);
  }
  const [u, x] = run(q, g);
  mkdirSync(O + '/' + id, { recursive: true });
  writeFileSync(O + '/' + id + '/stdout.bin', u);
  writeFileSync(O + '/' + id + '/exit.txt', x + '\n');
}
