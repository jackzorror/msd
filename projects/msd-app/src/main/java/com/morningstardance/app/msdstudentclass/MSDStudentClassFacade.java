package com.morningstardance.app.msdstudentclass;

import com.morningstardance.app.msdstudent.MSDStudentClassDto;

public interface MSDStudentClassFacade {

	MSDStudentClassDto registerStudentToClass(MSDStudentClassDto studentClassDto);

	void deleteRegisteredStudentClass(Long id);

	String registerStudentToClasses(Long msdstudentid, String msdclassidlist);

	String deleteRegisterStudentToClasses(Long msdstudentid, String msdclassidlist);

	String registerClassByClassNameAndStudentIDlistAndType(String classname, String studentidlist, String oldclassname, String registertype);
}
