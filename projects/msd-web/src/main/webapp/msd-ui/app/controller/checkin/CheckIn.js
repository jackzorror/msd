Ext.define('MSD.controller.checkin.CheckIn' ,{
    extend: 'Ext.app.Controller',

	msdclass:null,
	
	stores: ["Students"],
	
	refs:[
    	{ ref : 'functionpanelview', selector: 'functionpanel' },
		{ ref : 'checkinsearchview', selector: 'checkinsearch' },
		{ ref : 'checkinresultview', selector: 'checkinresult' }
	],
	
	
    init: function() {
        this.control({
            'checkinsearch button[name=search]': {
                click: this.onCheckInSearchClick
            },
            'checkinresult' : {
            	'checkinstudent':this.onCheckInStudent
            }
        });
    },
    onCheckInStudent: function(sdata, cdata) {
    	console.log(' in controller check in student ... ');

		var checkin = null;

//    	checkin = Ext.create('Sp.model.StudentCheck', {id:0, studentId:sdata.id, classId:cdata.id, checkinTime:new Date()});        
//        var writer = new Ext.data.Writer();
        
//		var checkindata = writer.getRecordData(checkin);
		var checkinurl = '../msd-app/msdstudent'; 
		var studentId = sdata.id;
		var classId = cdata.id;
		
    	var checkinReq = Ext.Ajax.request({
    		scope: this,
            url: checkinurl, 
            method: 'POST',
			params: { msdstudentid:studentId, msdclassid:classId },
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			    success: function() {
				console.log('student check in successfully ... ');
		    },
		    failure:function() {
				var alert = Ext.Msg.alert("Error", "Error check in student .... ", Ext.emptyFn); 
				alert.setZIndex(this.getZIndex() + 4);
		    }
		});
    	
    },
    onCheckInSearchClick: function( cmp, e, eOpts ) {
    	var container = this.getFunctionpanelview();
    	if (null != container) {
    		console.log("Got functionpanel ... ");

    		var checkinclasscombo = Ext.ComponentQuery.query('[name=checkinclass]')[0];
    		if (null != checkinclasscombo) {
    			console.log("Got check in class combo : " + checkinclasscombo.getValue());
    			
    			if (null == checkinclasscombo.getValue()) {
    				alert(" Please select one class from the list");
    			} else {
			        var store = this.getStore("Students");
    				store.getProxy().extraParams.msdclassid=checkinclasscombo.getValue();
        			store.load({
						callback: this.afterLoadStudentStore,
						scope:this
        			});

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
    	var container = this.getFunctionpanelview();
		if (null != container) {
			console.log(" try to create grid ... ");

    		var checkinresult = this.getCheckinresultview();
    		if (null == checkinresult) {
    			checkinresult = Ext.create('MSD.view.checkin.CheckInResult');
    			checkinresult.setData(this.getStore("Students"), this.msdclass);
    			
	    		container.add(checkinresult);
    		} else {
    			checkinresult.resetstudentstore(this.getStore("Students"), this.msdclass);
    		}
   			checkinresult.show();
		}
    }
    
});
