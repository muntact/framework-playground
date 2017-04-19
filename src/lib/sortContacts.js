import R from 'ramda';

const getLowerName = R.compose(R.toLower, R.prop('name'));

export const sortNamesAsc = collection => R.sortBy(getLowerName)(collection);
export const sortNamesDesc = collection => R.sortBy(R.compose(R.not, getLowerName))(collection);
