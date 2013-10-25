Ext.define('MSD.view.Viewport', {
    extend: 'Ext.container.Viewport',

	requires:[
        'MSD.view.MainPanel'
        ,'MSD.view.ButtonPanel'
        ,'MSD.view.FunctionPanel'
        ,'MSD.view.checkin.CheckInSearch'
        ,'MSD.view.checkin.CheckInResult'
	],
    layout: {
    	type: 'vbox',
    	align:'center',
    },
	initComponent: function() {
		this.items = {
			xtype: 'panel',
			dockedItems: [{
				border:false,
				xtype: 'panel',
				height: 220,
				width: 600,
				html:"<p align=\"center\"><img align=\"middle\" src=\"msd.jpg\" alt=\"some_text\"></p>"
			}],
			items: [{
				xtype:'mainpanel',
			}],
		};
		this.callParent();
	}
});