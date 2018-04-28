const Twitter = require('./twitter')
let should = require('chai').should()

describe('Twitter', () => {
    it('get channel', async () => {
        let twitterApi = new Twitter()
        let info = await twitterApi.getChannel('StephenKing')
        info.should.have.ownProperty('id')
        info.should.have.ownProperty('title')
        info.should.have.ownProperty('url')
        info.should.have.ownProperty('type')
        info.type.should.to.equal('twitter')
    })

    it ('get fake channel', async() => {
        let twitterApi = new Twitter()
        let info = await twitterApi.getChannel('blablablablabla')
        Object.keys(info).length.should.to.equal(0)
    })
})