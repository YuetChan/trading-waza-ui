const replaceUnderscoreWith = (word, replacement) => {
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

export default replaceUnderscoreWith;