export const parseDatesFromText = text => {

    let results = text.match(/[0-9]{1,2}([\-\/ \.])[0-9]{1,2}([\-\/ \.])((19)|(20))[0-9]{2}/g)

    if (!results.length)
        return ''
    
    return results.join(', ')
}