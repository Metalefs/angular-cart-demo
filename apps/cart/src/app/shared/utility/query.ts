export const objectToQueryString = (obj: any) => {
  return Object.keys(obj).map((key,idx) => {
    if((obj as any)[key] === null) return '';
    return key + '=' + obj[key] + (idx === Object.keys(obj).length -1 ? '' : '&');
  }).join('');
}
