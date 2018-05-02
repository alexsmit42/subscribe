const config = require('config')
const Twitter = require('./platforms/twitter')

let classes = {
    'twitter': Twitter
}

let utils = {
    capitalizeFirstLetter: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getPlatforms: () => {
        let platforms = Object.keys(config.get('platforms'))
        for (let platform of platforms) {
            let platformClass = new classes[platform]()
            platformClass.getPosts(2233154425, 990753753853775872).then(posts => {
                console.log(posts)
            })
        }
    }
}

module.exports = utils