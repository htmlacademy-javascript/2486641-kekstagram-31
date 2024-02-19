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

// Строка короче 20 символов
checkLenght('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkLenght('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkLenght('проверяемая строка', 10); // false

// Строка является палиндромом
checkPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindrome('ДовОд'); // true
// Это не палиндром
checkPalindrome('Кекс'); // false
// Это палиндром
checkPalindrome('Лёша на полке клопа нашёл '); // true

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN
extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15
