package com.morningstardance.app.msdstudentclass;

import com.morningstardance.app.msdstudent.MSDStudentClassDto;

public interface MSDStudentClassFacade {

	MSDStudentClassDto registerStudentToClass(MSDStudentClassDto studentClassDto);

	void deleteRegisteredStudentClass(Long id);
}
