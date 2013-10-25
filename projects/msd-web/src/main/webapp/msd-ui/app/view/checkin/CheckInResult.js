Ext.define('MSD.view.checkin.CheckInResult' ,{
    extend: 'Ext.container.Container',
    
    xtype : 'checkinresult',
    studentstore : null,
    msdclass: null,
    
    listeners: {
        'render': function() {
            console.log(" in checkinresult render() ... ");
			var gird = Ext.create('Ext.grid.Panel', {
				msdclass:null,
			    renderTo: Ext.getBody(),
			    store: this.studentstore,
			    width: 400,
			    height: 200,
			    columns: [
			        {
			            text: 'Name',
            			width: 100,
			            sortable: false,
            			hideable: false,
			            dataIndex: 'name'
			        },
			        {
            			text: 'ID',
			            width: 150,
			            dataIndex: 'id',
            			hidden: true
			        }
			    ],
			});
			gird.msdclass = this.msdclass;
			gird.addListener('select',this.checkinstudent,this);
			this.add(gird);
        },
        'show':function() {
        	console.log(" in checkinresult show() ... ");
        }
    },
    checkinstudent:function(record, index, eOpts) {
   		console.log( ' pick up item : ' + index.data.name + ' class : ' + this.msdclass.name);
    	this.fireEvent('checkinstudent', index.data, this.msdclass);
    },
    resetstudentstore:function(sstore, mclass) {
    	this.studentstore = sstore;
    	this.msdclass = mclass;
    	
    	this.items.items[0].bindStore(this.studentstore);
    },
    setData:function(sstore, mclass) {
    	this.studentstore = sstore;
    	this.msdclass = mclass;
    }
});
