import { orderBy } from 'lodash';

// Could abstract this so that we call sortNames(collection, order) but meh, already trivial.
export const sortNamesAsc = collection => orderBy(collection, ['name'], ['asc']);
export const sortNamesDesc = collection => orderBy(collection, ['name'], ['desc']);
