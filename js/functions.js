function checkLenght(str, maxLenght){
  return (maxLenght >= str.length);
}

function checkPalindrome(str){
  const phrase = str.replaceAll(' ', '').toLowerCase();
  let reversePhrase = '';
  for (let i = phrase.length - 1; i >= 0; i--){
    reversePhrase += phrase[i];
  }
  return (reversePhrase === phrase);
}

function extractNumber(param){
  const str = param.toString();
  let num = '';
  for (let i = 0; i < str.length; i++){
    num += (Number.isNaN(parseInt(str[i], 10))) ? '' : str[i];
  }
  return parseInt(num, 10);
}
