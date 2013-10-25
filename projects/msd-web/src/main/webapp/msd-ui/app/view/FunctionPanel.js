Ext.define('MSD.view.FunctionPanel' ,{
    extend: 'Ext.container.Container',
    xtype : 'functionpanel',
    
    listeners: {
        'render': function() {
            console.log(" in functionpanel render() ... ");
        },
    },
});