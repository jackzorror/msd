Ext.define('MSD.controller.checkin.CheckIn' ,{
    extend: 'Ext.app.Controller',

	studentstore:null,
	msdclass:null,
	
    init: function() {
        this.control({
            'checkinsearch button[name=search]': {
                click: this.onCheckInSearchClick
            },
            'checkinresult ':{
            	checkinstudent:this.onCheckInStudent
            }
        });
    },
    onCheckInStudent: function(sdata, cdata) {
    	console.log(' in controller check in student ... ');
    },
    onCheckInSearchClick: function( cmp, e, eOpts ) {
    	var container = Ext.ComponentQuery.query('functionpanel')[0];
    	if (null != container) {
    		console.log("Got functionpanel ... ");

    		var checkinclasscombo = Ext.ComponentQuery.query('[name=checkinclass]')[0];
    		if (null != checkinclasscombo) {
    			console.log("Got check in class combo : " + checkinclasscombo.getValue());
    			
    			if (null == checkinclasscombo.getValue()) {
    				alert(" Please select one class from the list");
    			} else {
    				var sstore = Ext.create('MSD.store.Students');
    				sstore.getProxy().extraParams.msdclassid=checkinclasscombo.getValue();
    				sstore.load({
						callback: this.afterLoadStudentStore,
						scope:this
    				});
    				this.studentstore = sstore;
    				this.msdclass = checkinclasscombo.valueModels[0].data;
    			}
			}
    	} else {
	        console.log("Didn't get functionpanel");
	    }
	    console.log("User clicked on check in Search button");
    },
    afterLoadStudentStore: function() {
    	console.log(" load student store");
    	var container = Ext.ComponentQuery.query('functionpanel')[0];
		if (null != container) {
			console.log(" try to create grid ... ");

    		var checkinresult = Ext.ComponentQuery.query('checkinresult')[0];
    		if (null == checkinresult) {
    			checkinresult = Ext.create('MSD.view.checkin.CheckInResult');
    			checkinresult.setData(this.studentstore, this.msdclass);
    			
	    		container.add(checkinresult);
    		} else {
    			checkinresult.resetstudentstore(this.studentstore, this.msdclass);
    		}
   			checkinresult.show();
		}
    }
    
});
