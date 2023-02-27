export const validateField = (fieldName: string, value: string) => {
    let isValid
    let message = ''
    switch(fieldName) {
        case 'email':
            isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i);
            message = isValid ? '' : 'errors.email';
            break;
        case 'password':
            isValid = value.length >= 6;
            message = isValid ? '': 'errors.password';
            break;
        case 'fName':
            isValid = value.match(/^\w{3,}$/i);
            message = isValid ? '': 'errors.fName';
            break;
        case 'lName':
            isValid = value.match(/^\w{3,}$/i);
            message = isValid ? '': 'errors.lName';
            break;
        default:
            break;
    }
    return message
}

export const shortText = (text: string, length: number) => {
    return text.length >= length ? text.slice(0,length) + '...' : text
}