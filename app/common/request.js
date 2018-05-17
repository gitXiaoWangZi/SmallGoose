'use strict'

import queryString from 'query-string'
import _ from 'lodash'
import config from './config'
var request = {}

request.get = (url, params) => {
	if (params) {
		url += '?' + queryString.stringify(params)
	}

	return fetch(url)
		.then((response) => response.json())

}


request.post = (url, body) => {
	var options = _.extend(config.header, {
		body: JSON.stringify(body)
	})

	return fetch(url, options)
		.then((response) => response.json())

}


module.exports = request