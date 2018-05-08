
class Platform {

    constructor() {
        this._client = this.getClient()
    }

    addChannel(channelID) {
        this.getChannel(channelID)
    }
}

module.exports = Platform