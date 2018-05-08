let mongo = require('./mongo')
let should = require('chai').should()

describe('MongoDB', () => {

    it('get channel', async () => {
        let channel = await mongo.getChannel('2233154425', 'twitter')
        channel.channelID.should.to.equal('2233154425')
        channel.title.should.to.equal('Stephen King')
    })
})