const classes = {
    'twitter': require('./twitter'),
    'facebook': require('./facebook')
}

module.exports = function(type) {
    if (classes[type] === undefined) {
        type = 'twitter'
    }

    return new classes[type]()
};