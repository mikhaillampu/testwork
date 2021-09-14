const express = require('express');
const getCurrencyRates = require('./parser');
const pricer = express();
pricer.listen(3000, () => { });
pricer.get('*', async (req, res) => {
        const correct = req.url.match(/fsyms=(.*?)&tsyms=(.*?)/);
        if (correct) {
                const [, fsyms, tsyms] = correct;
                const rate = await getCurrencyRates(fsyms, tsyms);
                res.send(rate);
        } else res.send('You need to specify fsyms and tsyms')
})