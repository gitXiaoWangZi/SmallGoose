'use strict'

module.exports = {
	header: {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	},

	api: {
		base: 'http://api.xiaoe.kouzicr.com/',
    	addBill: 'addBill',
		home:'bill',
		detailList:'detailsbill',
		deleteBill:'delbill',
		report:'reportform',
    	creditLoginVercode:'creditLoginVercode',
		login:'creditphoneLogin',
        feedback:'feedback'
	}

}