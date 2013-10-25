Ext.define('MSD.store.Classes', {
    extend: 'Ext.data.Store',
    	
    model: 'MSD.model.Class',

    autoLoad: true,

    proxy: {
    	type:'rest',
    	url:'../msd-app/msdclass',
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