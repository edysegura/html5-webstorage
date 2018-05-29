/* JavaScript Document */

var TableController = {

	table: null,

	setTable: function(table) {
		this.table = table;
	},

	addItem: function(item, editCallback, deleteCallback) {
		if(item) {
			var tbody = TableController.table.tBodies[0],
			    row = TableController.createNewRow(),
			    index = 0;
			
			row.cells[index++].innerHTML = item.name;
			row.cells[index++].innerHTML = item.email;
			TableController.createActions(row.cells[index++], item, editCallback, deleteCallback);

			tbody.appendChild(row);
		}
	},

	addList: function(list, editCallback, deleteCallback) {
		if(list && list.length > 0) {
			for (var i = 0, leng = list.length; i < leng; i++) {
				TableController.addItem(list[i], editCallback, deleteCallback);
			}
		}
	},

	clearList: function() {
		TableController.table.tBodies[0].innerHTML = "";
	},
	
	createNewRow: function() {
		var row = document.createElement('tr');
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		return row;
	},

	createActions: function(cell, item, editCallback, deleteCallback) {
		var editElement = document.createElement("span"),
		    deleteElement = document.createElement("span");

		editElement.innerHTML = "Edit ";
		editElement.setAttribute("data-email", item.email);
		editElement.className = "btn btn-success";

		deleteElement.innerHTML = "Delete";
		deleteElement.setAttribute("data-email", item.email);
		deleteElement.className = "btn btn-danger";

		if(editCallback) {
			editElement.onclick = function(){
				var email = editElement.getAttribute('data-email');
				editCallback(email);
			};
		}

		if(deleteCallback) {
			deleteElement.onclick = function(){
				var email = deleteElement.getAttribute('data-email');
				deleteCallback(email, deleteElement);
			};
		}

		cell.appendChild(editElement);
		cell.appendChild(deleteElement);
	}
};
