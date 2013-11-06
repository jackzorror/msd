Ext.define('MSD.view.checkin.CheckInStudentGrid' ,{
    extend: "Ext.grid.Panel",
    xtype: "checkinstudentgrid",
    title: "Student List",
    store: null,
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
