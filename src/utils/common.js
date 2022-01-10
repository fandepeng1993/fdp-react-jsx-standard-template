/**
 * 判断url是否携带http(s)
 * @param url
 * @returns {boolean}
 */
export const isHttpUrl = (url) => {
  // /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  let reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(url);
};