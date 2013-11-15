package com.morningstardance.app.msdstudent;

import java.util.List;

public interface MSDStudentFacade {

	List<MSDStudentDto> getAllStudents();

	List<MSDStudentDto> getAllStudentsByClassId(Long msdClassId);

	List<MSDStudentDto> getAllStudentsByClassIdForCheckin(Long msdClassId);

	MSDStudentDto getStudentByName(String firstname, String lastname);
}
