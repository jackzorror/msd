package com.morningstardance.app.msdstudentcheckin;

import java.util.List;

public interface MSDStudentCheckinFacade {

	MSDStudentCheckinDto studentClassCheckin(Long msdStudentId, Long msdClassId);

	List<MSDStudentCheckinDto> getAllStudentCheckinDtoForCheckInByClassId(Long msdClassId);

	MSDStudentCheckinDto getStudentCheckinDtoByLastNameFirstName(
			Long msdclassid, String lastname, String firstname);

	List<String> getFieldList(String fieldname);

	String checkStudentClassRegisteinformation(Long msdclassid,
			Long msdstudentid);

	MSDStudentCheckInValidResultDto validStudentCheckInInformation(String firstname, String lastname,
			String msdclassname);
}
