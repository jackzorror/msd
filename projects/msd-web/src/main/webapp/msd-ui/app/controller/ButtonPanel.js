Ext.define('MSD.controller.ButtonPanel' ,{
    extend: 'Ext.app.Controller',

    views: [
    	'MSD.view.FunctionPanel'
    ],

    init: function() {
        this.control({
            'buttonpanel button[name=showclass]': {
                click: this.onShowClassClick
            },
            'buttonpanel button[name=showstudent]': {
                click: this.onShowStudentClick
            },
            'buttonpanel button[name=showcheckin]': {
                click: this.onShowCheckInClick
            }
        });
    },
    onShowClassClick: function( cmp, e, eOpts ) {
    	console.log(' click button showclass ... ');
    	var fpanel = Ext.ComponentQuery.query('functionpanel')[0];
    	if (fpanel.items.length > 0) {
    		fpanel.removeAll();
    	}
    },
    onShowStudentClick: function( cmp, e, eOpts ) {
    	console.log(' click button showstudent ... ');
    	var fpanel = Ext.ComponentQuery.query('functionpanel')[0];
    	if (fpanel.items.length > 0) {
    		fpanel.removeAll();
    	}
    },
    onShowCheckInClick: function( cmp, e, eOpts ) {
    	console.log(' click button showcheckin ... ');
    	var fpanel = Ext.ComponentQuery.query('functionpanel')[0];
    	if (null != fpanel) {
    		var checkinsearch = Ext.ComponentQuery.query('checkinsearch')[0];
    		if (null == checkinsearch) {
    			if (fpanel.items.length > 0) {
    				fpanel.removeAll();
    			}
    			checkinsearch = Ext.create('MSD.view.checkin.CheckInSearch');
	    		fpanel.add(checkinsearch);
    			checkinsearch.show();
    		}
    	}
    }
});
