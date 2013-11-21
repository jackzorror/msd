package com.morningstardance.app.msdstudent;

import java.util.List;

import com.morningstardance.domain.entity.MSDStudent;

public interface MSDStudentAssembler {

	MSDStudentDto createDtoFromEntity(MSDStudent msdStudent);
	
	List<MSDStudentDto> createDtoFromEntity(List<MSDStudent> msdStudents);
	
	MSDStudentDetailDto createDetailDtoFromEntity(MSDStudent msdStudent);
	
	List<MSDStudentDetailDto> createDetailDtoFromEntity(List<MSDStudent> msdStudents);

}
