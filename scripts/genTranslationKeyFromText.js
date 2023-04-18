#!/usr/bin/env node

function main() {
  const [, , sentence] = process.argv;

  if (typeof sentence !== 'string') {
    throw Error('arg must be a sentence string. Like: "Ein Satz."');
  }

  const keyParts = getKeyPartsOfSentence(sentence);
  const key = joinKeyPartsToKey(keyParts);
  const output = `"${key}": "${sentence}",`;
  console.log(output);
}

function getKeyPartsOfSentence(string) {
  const sentenceWihtoutAccents = removeAccents(string);

  const sentenceWithReducedInterpolations = sentenceWihtoutAccents.replace('ß', 'ss').replace(/{{(\w+).*?}}/g, '$1');

  const sentenceWithoutSpecialCharacters = sentenceWithReducedInterpolations
    .replaceAll(/<[^>]*>/g, '') // Remove html tags <tag> and </tag> (keeping content)
    .replace(/\n/g, singleSpace)
    .replace(/\\n/g, singleSpace)
    .replace(/[^\w\s]+/g, '');

  return sentenceWithoutSpecialCharacters
    .split(singleSpace)
    .filter(definedFilter)
    .filter(singeSpaceFilter)
    .map(capitalizeFirstLetter);
}

function joinKeyPartsToKey(parts, maxKeyLength = 70, overflowSuffix = 'XX') {
  const completeKey = parts.join('');
  return completeKey.length <= maxKeyLength
    ? completeKey
    : completeKey.substr(0, maxKeyLength).slice(0, -overflowSuffix.length) + overflowSuffix;
}

//#region   Helper
// Example: https://codepen.io/marcelo-ribeiro/pen/OJmVOyW

const accentsMap = new Map([
  ['A', 'Á|À|Ã|Â|Ä'],
  ['a', 'á|à|ã|â|ä'],
  ['E', 'É|È|Ê|Ë'],
  ['e', 'é|è|ê|ë'],
  ['I', 'Í|Ì|Î|Ï'],
  ['i', 'í|ì|î|ï'],
  ['O', 'Ó|Ò|Ô|Õ|Ö'],
  ['o', 'ó|ò|ô|õ|ö'],
  ['U', 'Ú|Ù|Û|Ü'],
  ['u', 'ú|ù|û|ü'],
  ['C', 'Ç'],
  ['c', 'ç'],
  ['N', 'Ñ'],
  ['n', 'ñ'],
]);

const reducer = (acc, [k]) => acc.replace(new RegExp(accentsMap.get(k), 'g'), k);

const removeAccents = (text) => [...accentsMap].reduce(reducer, text);

const singleSpace = ' ';
const singeSpaceFilter = (e) => e !== singleSpace;
const definedFilter = (e) => !!e;
const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);
//#endregion Helper

main();
