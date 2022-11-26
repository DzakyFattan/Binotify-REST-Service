const jsonxml = require('jsontoxml');
const xml2js = require('xml2js');
const { promisify } = require('util');
const axios = require('axios');

const SOAPRequest = async (ns1, apikey, payload) => {
    var url = 'http://tubes2-soap-ws:2434/subscription';
    let args = jsonxml(payload, { html: true });
    var request = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ns1:${ns1} xmlns:ns1="http://service.tubes2.com/">
            ${args}
        </ns1:${ns1}>js
      </soap:Body>
    </soap:Envelope>`;

    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'Content-Length': request.length,
        'Authorization': apikey
    };

    // console.log(request);
    let result = await axios.post(url, request, { headers: headers })
    // console.log(result.data);
    var parser = new xml2js.Parser({ trim: true, explicitArray: false, explicitRoot: false, ignoreAttrs: true });
    var parseString = promisify(parser.parseString);
    let parsed = await parseString(result.data);
    console.log(parsed["S:Body"][`ns2:${ns1}Response`].return);
    return parsed["S:Body"][`ns2:${ns1}Response`].return;
};

module.exports = {
    SOAPRequest,
};