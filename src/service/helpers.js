// helper to replace space chars to %20, probably could have found a lib to do it, but meh its 1 line.
export const urlEncodeSpaces = text => text.replace((new RegExp(' ', 'g'), '%20'));
// convenience helper to make reading useless arrows nicer.
export const toJSON = response => response.json();
