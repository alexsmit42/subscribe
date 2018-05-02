let parser = require('./parser')
let should = require('chai').should()

describe('Parser', () => {

    describe('Twitter', () => {

        it ('parse url', () => {
            let channel = parser.parseSubscribe('https://twitter.com/StephenKing?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor')
            channel.type.should.be.equal('twitter')
            channel.title.should.be.equal('StephenKing')
        })

        it ('parse channel title', () => {
            let channel = parser.parseSubscribe('@StephenKing')
            channel.type.should.be.equal('twitter')
            channel.title.should.be.equal('StephenKing')
        })
    })
})