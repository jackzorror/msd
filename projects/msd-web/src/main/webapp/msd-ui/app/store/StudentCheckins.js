Ext.define('MSD.store.StudentCheckins', {
    extend: 'Ext.data.Store',
    	
    model: 'MSD.model.StudentCheckin',

    autoLoad: false,

    proxy: {
    	type:'rest',
    	url:'../msd-app/msdstudent',
  		headers:{
  			'Content-Type':'application/json',
   			'Accept':'application/json'
  		},
  		reader: {
  			type:'json'
  		},
  		listeners: {
  			exception:function(store, response, op) {
  				switch (response.status) {
  					case 401:
  					case 403:
  						console.log(" server error ... ");
  						break;
  					case 400:
  						Ext.Msg.alert(" Messge failed ", response.responseText);
  						break;
  				}
  			}
  		}
    }
});