package com.morningstardance.app.msdstudent;

import java.util.List;

public interface MSDStudentFacade {

	List<MSDStudentDto> getAllStudents();

	List<MSDStudentDto> getAllStudentsByClassId(Long msdClassId);

	MSDStudentCheckinDto studentClassCheckin(Long msdStudentId, Long msdClassId);

}
