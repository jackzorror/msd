Ext.define('MSD.controller.ButtonPanel' ,{
    extend: 'Ext.app.Controller',

    refs: [
    	{ ref: 'functionpanelview', selector: 'functionpanel' },
    	{ ref: 'checkinsearchview', selector: 'checkinsearch' }
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
    	var fpanel = this.getFunctionpanelview();
    	if (fpanel.items.length > 0) {
    		fpanel.removeAll();
    	}
    },
    onShowStudentClick: function( cmp, e, eOpts ) {
    	console.log(' click button showstudent ... ');
    	var fpanel = this.getFunctionpanelview();
    	if (fpanel.items.length > 0) {
    		fpanel.removeAll();
    	}
    },
    onShowCheckInClick: function( cmp, e, eOpts ) {
    	console.log(' click button showcheckin ... ');
    	var fpanel = this.getFunctionpanelview();
    	if (null != fpanel) {
    		var checkinsearch = this.getCheckinsearchview();
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
