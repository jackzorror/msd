package com.morningstardance.app.msdstudent;

import java.util.List;

import com.morningstardance.app.msdclass.MSDClassSummaryDto;

public interface MSDStudentFacade {

	List<MSDStudentDto> getAllStudents();

	List<MSDStudentDto> getAllStudentsByClassId(Long msdClassId);

	List<MSDStudentDto> getAllStudentsByClassIdForCheckin(Long msdClassId);

	MSDStudentDetailDto getStudentDetailDtoByName(String firstname, String lastname);

	List<MSDClassSummaryDto> getStudentRegisterClassByStudentId(Long msdstudentid);

	MSDStudentDetailDto getStudentDetailDtoById(Long msdstudentid);

	MSDStudentDetailDto updateStudentinformation(MSDStudentDetailDto studentDetailDto);

	MSDStudentDetailDto addStudent(MSDStudentDetailDto studentDetailDto);

	MSDStudentClassDto registerStudentToClass(MSDStudentClassDto studentClassDto);

	List<String> getStudentUniqueName(String fieldname);

	List<MSDClassSummaryDto> getStudentNonRegisterClassByStudentId(Long msdstudentid);
}
