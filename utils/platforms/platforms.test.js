const config = require('config')
const Platform = require('./')

let should = require('chai').should()

const platforms = Object.keys(config.get('platforms'))

const testData = {
    'twitter': {
        channel: 'StephenKing',
        channelID: '2233154425',
        lastPost: '990753753853775872'
    }
}

describe('Platforms', () => {

    platforms.forEach((platform) => {
        describe(platform, () => {
            let platformApi = new Platform(platform)
            let test = testData[platform]
    
            if (!test) {
                return
            }
    
            it('get channel', async () => {
                let info = await platformApi.getChannel(test.channel)
                info.should.have.ownProperty('channelID')
                info.should.have.ownProperty('title')
                info.should.have.ownProperty('url')
                info.should.have.ownProperty('type')
                info.type.should.to.equal('twitter')
            })
        
            it ('get fake channel', async() => {
                let info = await platformApi.getChannel('blablablablabla')
                Object.keys(info).length.should.to.equal(0)
            })
        
            it ('get posts', async() => {
                let posts = await platformApi.getPosts(test.channelID, test.lastPost)
                posts.length.should.be.above(0)
            })
        })
    })
})
