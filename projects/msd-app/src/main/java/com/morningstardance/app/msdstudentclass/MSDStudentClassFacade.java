package com.morningstardance.app.msdstudentclass;

import com.morningstardance.app.msdstudent.MSDStudentClassDto;

public interface MSDStudentClassFacade {

	MSDStudentClassDto registerStudentToClassByStudentClassDto(MSDStudentClassDto studentClassDto);

//	void unRegisterStudentFromClassById(Long id);

	String unRegisterStudentFromClassByStudentIdAndClassId(Long studentid, Long classid);
	
	String registerStudentToClassesByStudentIdAndClassIdList(Long msdstudentid, String msdclassidlist);

	String unRegisterStudentFromClassesByStudentIdAndClassIdList(Long msdstudentid, String msdclassidlist);

	String registerStudentToClassByClassIDAndStudentIdlistAndType(Long classid, String studentidlist, Long oldclassid, String registertype);
}
