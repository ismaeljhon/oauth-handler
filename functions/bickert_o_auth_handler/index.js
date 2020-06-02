module.exports = async (context, basicIO) => {
	/* 
        BASICIO FUNCTIONALITIES
    */

	const _forEach = require('lodash').forEach
	const _toString = require('lodash').toString
	const axios = require('axios')

	let oauthForm = basicIO.getArgument('oauthForm');
	let allowedParams = oauthForm.params
	let params = {}

	_forEach(allowedParams, paramName => {
		params[paramName] = oauthForm[paramName]
	})

	await axios.post(oauthForm.oauth_url, null, { params: params }).then(response => {
		basicIO.write(_toString(JSON.stringify(response.data)))
	}).catch(error => {
		basicIO.write(_toString(JSON.stringify(error.response.data)))
	})

	/* 
        CONTEXT FUNCTIONALITIES
    */
	context.log('successfully executed basicio functions');
	context.close(); //end of application
};
