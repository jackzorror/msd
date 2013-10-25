Ext.define('MSD.view.MainPanel' ,{
    extend: 'Ext.container.Container',
    
    xtype : 'mainpanel',
    width: 800,
    height: 600,
    layout: 'hbox',	
    items: [
    	{
    		xtype:'buttonpanel'
    	},
    	{
			xtype: 'functionpanel'
    	}
    ]
});