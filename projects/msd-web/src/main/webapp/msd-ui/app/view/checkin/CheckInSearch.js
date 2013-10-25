Ext.define('MSD.view.checkin.CheckInSearch' ,{
    extend: 'Ext.container.Container',
    
    xtype : 'checkinsearch',
    classstore : null,
    
    items: {
	    layout: {
	    	type: 'hbox'
	    },
		items: [{
			xtype: 'combobox',
			name:'checkinclass',
			fieldLabel: 'Choose a class',
			emptyText: 'Select a property to view calendar...',			
		    queryMode: 'local',
    		displayField: 'name',
    		valueField: 'id',
    		store: null,
    	},{
			xtype: 'button',
			name:'search',
			text:'Search'
		}]
    },
    listeners: {
        'render': function() {
            console.log(" in checkinsearch render() ... ");
            var aclassstore = Ext.create('MSD.store.Classes');
            aclassstore.load({
				callback: this.afterLoadClassStore,
				scope:this
            });
            this.classstore = aclassstore;
        },
        
    },
	init: function() {
		console.log(" in checkinserch init() ... ");
		this.callParent();
	},
	afterLoadClassStore:function() {
		console.log(" load class from server ... ");
        this.items.items[0].items.items[0].bindStore(this.classstore);
	},
});
