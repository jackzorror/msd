Ext.define('MSD.model.StudentCheckin', {
    extend: 'Ext.data.Model',
    fields: [
    	{ name: 'id', type: 'int' }
    	,{ name: 'studentId', type: 'int' }
    	,{ name: 'classId', type: 'int' }
    	,{ name: 'checkInTime', type: 'date' }
    ],
});