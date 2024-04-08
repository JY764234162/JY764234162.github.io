export function includesIgnoreCase(mainStr, subStr) {
  const regex = new RegExp(subStr, "i"); // 'i' 表示忽略大小写
  return regex.test(mainStr);
}

export function highlightKeyword(text, keyword) {
  if(!keyword) return text
  return text.replace(
    new RegExp(keyword, "gi"),
    '<span style="background-color: yellow;">$&</span>'
  );
}
