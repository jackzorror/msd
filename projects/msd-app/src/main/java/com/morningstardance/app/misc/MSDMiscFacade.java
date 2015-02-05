package com.morningstardance.app.misc;

import java.util.Date;
import java.util.List;

import com.morningstardance.domain.entity.MSDClassNonClassDate;

public interface MSDMiscFacade {

	List<MSDTypeDto> getCostType();

	List<MSDTypeDto> getCompetitionType();

	List<MSDTypeDto> getClassType();
	
	List<MSDTypeDto> getStudentType();
	
	List<MSDTypeDto> getFeeType();
	
	List<MSDSemesterDto> getSemester();
	
	MSDSemesterDto getCurrentSemester();
	
	MSDFileNameDto createStudentNameListFile(String string);

	MSDSemesterDto addSemester(MSDSemesterDto semesterDto);

	MSDSemesterDto updateSemester(MSDSemesterDto semesterDto);

	List<MSDTypeDto> getAllType();

	MSDSemesterDto addSemester(String name, Date startDate);

	MSDTypeDto addMSDType(MSDTypeDto type);

}
