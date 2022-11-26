const soap = require('./soapRequest');

const getSubRequests = async (req, res) => {
    // console.log('querying sub requests..');
    try {
        const { apikey, creator_id, subscriber_id, status } = req.body;
        const payload = {
            'arg0': creator_id,
            'arg1': subscriber_id,
            'arg2': status
        };
        let response = await soap.SOAPRequest('getSub', apikey, payload);
        // console.log(response);
        var result = response.content.value;
        var list = [];
        if (result != null) {
            if (typeof result == 'string') {
                var splitted = result.split(',');
                var obj = {
                    'creator_id': splitted[1],
                    'subscriber_id': splitted[2],
                    'status': splitted[3]
                };
                list.push(obj);
            } else {
                for (let i = 0; i < result.length; i++) {
                    var splitted = result[i].split(',');
                    var obj = {
                        'creator_id': splitted[1],
                        'subscriber_id': splitted[2],
                        'status': splitted[3]
                    };
                    list.push(obj);
                }
            }
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const updateSub = async (req, res) => {
    // console.log('updating sub request..');
    try {
        const { apikey, creator_id, subscriber_id, status } = req.body;
        const payload = {
            'arg0': creator_id,
            'arg1': subscriber_id,
            'arg2': status
        };
        let response = await soap.SOAPRequest('updateSub', apikey, payload);
        // console.log(response);
        if (response.status == '404') {
            res.status(404).json({ message: 'Not found' });            
        } else if (response.status == '200') {
            res.status(200).json({ message: 'Sub request updated' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = {
    getSubRequests,
    updateSub,
    getPremiumSongs
};