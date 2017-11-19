export const encrypt = (id) => id.split('').map(letter => letter.charCodeAt(0) - 20).join('')

export const decrypt = (id) => id
    ? id.match(/.{1,2}/g).map(letter => String.fromCharCode(parseInt(letter) + 20)).join('')
    : undefined
