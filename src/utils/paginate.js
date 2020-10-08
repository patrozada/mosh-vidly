import _ from 'lodash';
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber -1) * pageSize;
  // this is all lodash syntax... shrug
  return _(items).slice(startIndex).take(pageSize).value();
}