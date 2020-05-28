const secret = 'KennAnniePatrickBFFs4EVAIDOCST'
const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/activity-db'


module.exports = { secret, port, dbURI }