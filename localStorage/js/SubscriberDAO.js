/* JavaScript Document */

var SubscriberDAO = {

	DB_KEY: "subscribers",
	NEW: 1,
	UPDATE: 2,

	list: [], 

	save: function(subscriber, tableController) {
		var list  = SubscriberDAO.list,
		    index = SubscriberDAO.getIndex(subscriber);
		
		if(index > -1) {
			list[index] = subscriber;
			return SubscriberDAO.UPDATE;
		}
		else {
			list.push(subscriber);
			if(tableController) {
				tableController.addItem(subscriber);
			}
		}
		
		SubscriberDAO.serializeAndSave();

		return SubscriberDAO.NEW;
	},

	retrieve: function() {
		var list = SubscriberDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function(email) {
		var list  = SubscriberDAO.list,
		    index = SubscriberDAO.getIndex({'email': email});

		if (index > -1) {
			var subscriber = list[index];
			return subscriber;
		}

		return null;
	},

	getIndex: function(subscriber) {
		var list = SubscriberDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.email == subscriber.email) {
				return i;
			}
		}

		return -1;
	},

	delete: function(email) {
		var list  = SubscriberDAO.list,
		    index = SubscriberDAO.getIndex({'email': email});

		if (index > -1) {
			//https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice
			list.splice(index, 1);
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = SubscriberDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(SubscriberDAO.list);
			window.localStorage.setItem(SubscriberDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(SubscriberDAO.DB_KEY);
		if(json) {
			SubscriberDAO.list = JSON.parse(json);
		}
		else {
			SubscriberDAO.list = [];
		}
	}

};
