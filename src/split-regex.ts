export const matchByRegex = (text: string): Array<string> | null => {
  return text.match(/(^[a-z]+)|([0-9]+)|([A-Z]{1}[a-z]+)|([A-Z]+(?=([A-Z][a-z])|($)|([0-9])))/g);
};

export default (text: string) => {
  // TESTThis50ComponentNAME
  const match = matchByRegex(text);

  console.log('What is match', match);

  if (match) {
    return match.join('-').toLowerCase();
  }

  return 'default-component';
};