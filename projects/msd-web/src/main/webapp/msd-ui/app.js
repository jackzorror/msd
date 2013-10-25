Ext.Loader.setConfig({enabled: true});
Ext.require('Ext.container.Viewport');

Ext.application({
    name: 'MSD',
    appFolder: 'app',
   
    autoCreateViewport: true,
    controllers: [
    	'MSD.controller.ButtonPanel'
    	,'MSD.controller.checkin.CheckIn'
    ],
    
    launch: function(){
		console.log('App Launch');
	}
    
    
});
