Ext.define('MSD.view.ButtonPanel' ,{
    extend: 'Ext.container.Container',
    
    xtype : 'buttonpanel',
    width: 100,
    items: {
	    layout: {
	    	type: 'vbox'
	    },
		items: [{
			xtype: 'button',
			width: '100%',
			name:'showclass',
			text:'Class'
    	},{
			xtype: 'button',
			width: '100%',
			name:'showstudent',
			text:'Student'
		},{
			xtype: 'button',
			width: '100%',
			name:'showcheckin',
			text:'Check In'
		},{
			xtype: 'panel',
			width: '100%',
			height: 500,
			name: 'newspanel'
		}]
    },
    listeners: {
        'render': function() {
            console.log(" in ButtonPanel render() ... ");
        },
    },
	init: function() {
		console.log(" in checkinserch init() ... ");
		this.callParent();
	},
});
