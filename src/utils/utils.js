export const convertDecimalToHex = (bn) => {
  var base = 16;
  var hex = BigInt(bn).toString(base);
  if (hex.length % 2) {
    hex = '0' + hex;
  }

  return hex;
}

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}