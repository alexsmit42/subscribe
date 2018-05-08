const Platform = require('./platform')

class Facebook extends Platform {
    getType() {
        return 'facebook'
    }

    getClient() {
        return false
    }
}

module.exports = Facebook
