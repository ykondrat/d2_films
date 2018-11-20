// Format Date Object to YYYY-MM-DD format
const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString();
    const day = d.getDate().toString();
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return ([year, month, day].join('-'));
}

// Validate length of string by params
const validateLength = (text, minLength, maxLength) => {
    if (typeof text !== 'string') {
        throw new Error('text should be string');
    } else if (typeof minLength !== 'number') {
        throw new Error('minLength should be number');
    } else if (typeof maxLength !== 'number') {
        throw new Error('maxLength should be number');
    }

    return (!text || text.length < minLength || text.length > maxLength);
};

// Validate variable by regular expression
const validateRegExp = (variable, reqexp) => {
    if (!(reqexp instanceof RegExp)) {
        throw new Error('reqexp should be RegExp');
    }
    return (reqexp.test(variable));
};

// Memoize function (by Odin by Tor use your brain)
const memoize = (fn) => {
    if (typeof fn !== 'function') {
        throw new Error('Function memoize works only with function as arguments');
    }

    let previousArgument = null;
    let previousResult = null;

    return (argument) => {
        if (argument === previousArgument) {
            return (previousResult);
        }

        previousArgument = argument;
        previousResult = fn.call(this, argument);

        return (previousResult);
    }
};

// Get random string to set unique of element
const getUniqueID = (length = 15) => {
    if (typeof length !== 'number') {
        throw new Error('The function argument should be a number!');
    }

    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return (text);
};
