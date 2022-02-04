//------------------------------------------------------------
// Constraints

const numEl = document.getElementById('num');
const wordEl = document.getElementById('word');

// numEl should be a number (max 9 digits)
numEl.addEventListener('keypress', (e) => {
    if (isNaN(e.key) || e.target.innerText.length > 9) {
        e.preventDefault();
    }
    if (e.target.innerText[0] === '0') {
        e.target.innerText = e.target.innerText.slice(1);
    }
});

// wordEl should be a word including spaces
wordEl.addEventListener('keypress', (e) => {
    if (e.key.match(/[^a-zA-Z\s]/)) {
        e.preventDefault();
    }
});


//------------------------------------------------------------
// Functions

function objectFlip(obj) {
    const ret = {};
    Object.keys(obj).forEach(key => {
        ret[obj[key]] = key;
    });
    return ret;
}

const NUMLIST = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '10': 'ten',
    '11': 'eleven',
    '12': 'twelve',
    '13': 'thirteen',
    '14': 'fourteen',
    '15': 'fifteen',
    '16': 'sixteen',
    '17': 'seventeen',
    '18': 'eighteen',
    '19': 'nineteen',
    '20': 'twenty',
    '30': 'thirty',
    '40': 'forty',
    '50': 'fifty',
    '60': 'sixty',
    '70': 'seventy',
    '80': 'eighty',
    '90': 'ninety',
}

const VALUES = {
    '100': 'hundred',
    '1000': 'thousand',
    '100000': 'lakh',
    '10000000': 'crore',
}

const w_NUMLIST = objectFlip(NUMLIST);
const w_VALUES = objectFlip(VALUES);

const NUM_TO_WORD = (num) => {
    if (num < 20) {
        return NUMLIST[num];
    }
    if (num < 100) {
        return `${NUMLIST[Math.floor(num / 10) * 10]} ${NUMLIST[num % 10]}`;
    }
    if (num < 1000) {
        return `${NUM_TO_WORD(Math.floor(num / 100))} ${VALUES['100']} ${NUM_TO_WORD(num % 100)}`;
    }
    if (num < 100000) {
        return `${NUM_TO_WORD(Math.floor(num / 1000))} ${VALUES['1000']} ${NUM_TO_WORD(num % 1000)}`;
    }
    if (num < 10000000) {
        return `${NUM_TO_WORD(Math.floor(num / 100000))} ${VALUES['100000']} ${NUM_TO_WORD(num % 100000)}`;
    }
    if (num < 1000000000) {
        return `${NUM_TO_WORD(Math.floor(num / 10000000))} ${VALUES['10000000']} ${NUM_TO_WORD(num % 10000000)}`;
    }
}


const WORD_TO_NUM = (word) => {
    NUM = 0;
    TLIST = []
    WLIST = word.toLowerCase().split(' ');
    WLIST.forEach(w => {
        if (w in w_NUMLIST) {
            NUM += parseInt(w_NUMLIST[w]);
        } else if (w in w_VALUES) {
            NUM *= parseInt(w_VALUES[w]);
            TLIST.push(NUM);
            NUM = 0;
        }
        console.log(NUM);
    });

    return TLIST.reduce((a, b) => a + b, NUM);
};



//------------------------------------------------------------
// Event Listeners


numEl.addEventListener('keyup', (e) => {
    wordEl.innerText = NUM_TO_WORD(parseInt(e.target.innerText));
});


wordEl.addEventListener('keyup', (e) => {
    numEl.innerText = WORD_TO_NUM(e.target.innerText);
});