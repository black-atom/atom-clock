const {
  reduce,
  length,
  indexOf,
  __,
} = require('ramda');

// eslint-disable-next-line
const ASCII = ' !"#$%&' + "'" + '()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[' + '\\' + ']^_`abcdefghijklmnopqrstuvwxyz{|}';
const HEX = '0123456789ABCDEF';

const getIndexOFASCII = indexOf(__, ASCII);
const getIndexOFHEX = indexOf(__, ASCII);
const getCharAtHEX = i => HEX.charAt(i);
const getCharAtASCII = i => ASCII.charAt(i);

const checkSum = (str) => {
  const paramLength = length(str);

  // eslint-disable-next-line no-bitwise
  let check = reduce((acc, char) => acc ^ (getIndexOFASCII(char) + 32), 0, str);

  check ^= paramLength % 256; // eslint-disable-line no-bitwise
  check ^= paramLength / 256; // eslint-disable-line no-bitwise

  const h16 = Math.floor(check / 16);
  const h1 = check % 16;
  return (getCharAtHEX(h16) + getCharAtHEX(h1));
};

const generateParamLength = (str) => {
  const paramLength = length(str);
  const h1 = paramLength % 256;
  const h16 = Math.floor(paramLength / 256);

  let h1Str = h1.toString(16);
  if (h1Str.length === 1) {
    h1Str = `0${h1Str}`;
  }

  let h16Str = h16.toString(16);
  if (h16Str.length === 1) {
    h16Str = `0${h16Str}`;
  }

  const tempStr = h1Str + h16Str;
  return tempStr.toUpperCase();
};

const DoAsciiHex = (dados, dir) => {
  let r = '';
  if (dir === 'A2H') {
    for (let i = 0; i < dados.length; i += 1) {
      const char = dados.charAt(i);
      const pos = getIndexOFASCII(char) + 32;
      const h16 = Math.floor(pos / 16);
      const h1 = pos % 16;
      r += getCharAtHEX(h16) + getCharAtHEX(h1);
    }
  }

  if (dir === 'H2A') {
    for (let i = 0; i < dados.length; i += 1) {
      const let1 = dados.charAt(2 * i);
      const let2 = dados.charAt((2 * i) + 1);
      const val = (getIndexOFHEX(let1) * 16) + getIndexOFHEX(let2);
      r += getCharAtASCII(val - 32);
    }
  }

  return r;
};

const hexToBin = (hexString) => {
  const bytes = [];

  for (let i = 0; i < hexString.length - 1; i += 2) {
    bytes.push(parseInt(hexString.substr(i, 2), 16));
  }

  return String.fromCharCode(...bytes);
};

const formatToClock = (strCommand) => {
  let formatDados = '02';
  formatDados += generateParamLength(strCommand);
  formatDados += DoAsciiHex(strCommand, 'A2H');
  formatDados += checkSum(strCommand);
  formatDados += '03';
  return hexToBin(formatDados);
};

module.exports = {
  formatToClock,
};
