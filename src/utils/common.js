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

export const logBadge = (text1, text2, bg_color1, bg_color2,color1='#fff',color2='#fff') => {
  console.log(
    '%c '.concat(text1, ' %c ').concat(text2, ' '),
    'padding:1px;border-radius:3px 0 0 3px;color:'.concat(color1,';').concat('background:'.concat(bg_color1, ';')),
    'padding:1px;border-radius:0 3px 3px 0 ;color:'.concat(color2,';').concat('background:'.concat(bg_color2, ';'))
  );
};