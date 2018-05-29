/* JavaScript */

var Index = {

	init: function() {
		Index.setForm();
		Index.listSubscribers();
	},

	setForm: function() {
		var form = document.getElementById('fb-subscriber');
		if(form) {
			form.onsubmit = function() {
				Index.saveSubscriber(form);
				return false; //to prevent the form submition
			};
		}
	},

	saveSubscriber: function(form) {
		var subscriber = {};
		subscriber.name  = form.name.value;
		subscriber.email = form.email.value;
		
		if(SubscriberDAO.save(subscriber) == SubscriberDAO.NEW) {
			TableController.addItem(subscriber, Index.edit, Index.delete);
		}
		else {
			TableController.clearList();
			Index.listSubscribers();
		}

		form.name.value = form.email.value = "";
	},

	setTable: function() {
		var table = document.getElementById('tb-subscriber');
		TableController.setTable(table);
	},

	listSubscribers: function() {
		Index.setTable();
		var subscriberList = SubscriberDAO.retrieve();
		if (subscriberList && subscriberList.length) {
			TableController.addList(subscriberList, Index.edit, Index.delete);
		}
	},

	edit: function(email) {
		if(confirm("Do you want edit " + email)) {
			var subscriber = SubscriberDAO.get(email);
			if (subscriber) {
				var form = document.getElementById('fb-subscriber');
				form.name.value  = subscriber.name;
				form.email.value = subscriber.email;
			}
		}
	},

	delete: function(email, element) {
		if(confirm("Are you sure about to delete " + email)) {
			var subscriber = SubscriberDAO.get(email);
			if (subscriber) {
				if(SubscriberDAO.delete(email)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};

//initialization
SubscriberDAO.unserializeAndParse();
Index.init();