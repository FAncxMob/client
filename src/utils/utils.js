export const isPhone = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return !!flag;
};

export function buildUrlWithParams(baseUrl, params) {
  // 将对象中的键值对转换成 URL 查询字符串
  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  // 如果 baseUrl 已经有查询参数，则加 '&'，否则加 '?'
  return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${queryString}`;
}
