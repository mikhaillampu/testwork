const axios = require('axios').default;
const { db, source, fsyms, tsyms } = require('./config');
const schedule = require('node-schedule');

module.exports = async function getCurrencyRates(fsyms, tsyms) {
        try {
                if (fsyms && tsyms) {
                        return await requester(fsyms, tsyms)
                } else if (!fsyms && !tsyms) {
                        await db().authenticate();
                        for await (const currency of fsyms) {
                                const currencySnapShot = await requester(currency, tsyms);
                                await db().create({ currency, currencySnapShot })
                        }
                } else return { error: 'You should provide both fsyms and tsyms or nothing as arguments' }
        }
        catch (error) {
                console.log(error)
        }
};

async function requester(fsyms, tsyms) {
        try {
                return (await axios.get(`${source}fsyms=${fsyms}&tsyms=${typeof (tsyms) === 'string' ? tsyms : tsyms.join(',')}`)).data
        }
        catch (error) {
                return await db().findOne({ where: { currency: fsyms }, order: [['createdAt', 'DESC']] })
        }

};

const rule = schedule.scheduleJob('getRates', '0 0 */1 * * *', getCurrencyRates);
