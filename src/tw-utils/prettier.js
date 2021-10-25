export  const replaceUnderscoreWith = (word, replacement) => {
    let prettierWord = '';
    for(let i = 0; i < word.length; i++) {
        if(word[i] === '_' && i !== word.length -1) {
            prettierWord = prettierWord + replacement + word[i + 1];
            i ++;
        }else {
            prettierWord = prettierWord + word[i];
        }
    }

    return prettierWord;
} 

export  const capitalizeBy = (word, delimiter) => {
    let prettierWord = '';
    prettierWord = prettierWord + word[0].toUpperCase();

    for(let i = 1; i < word.length; i++) {
        if(word[i - 1] === delimiter) {
            prettierWord = prettierWord + word[i].toUpperCase();
        }else {
            prettierWord = prettierWord + word[i];
        }
    }

    return prettierWord;
} 
