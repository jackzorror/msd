package com.morningstardance.app.msdstudentcheckin;

import java.util.Date;
import java.util.List;

public interface MSDStudentCheckinFacade {

	MSDStudentCheckinDto studentClassCheckin(Long msdStudentId, Long msdClassId);

	List<MSDStudentCheckinDto> getAllStudentCheckinDtoForCheckInByClassId(Long msdClassId);

	MSDStudentCheckinDto getStudentCheckinDtoByLastNameFirstName(
			Long msdclassid, String lastname, String firstname);

	List<String> getFieldList(String fieldname);

	String checkStudentClassRegisteinformation(Long msdclassid,
			Long msdstudentid);
	
	MSDStudentCheckinDto studentClassCheckin(MSDStudentCheckinDto indto) ;
	
	MSDStudentCheckInValidResultDto validStudentCheckInInformation(String firstname, String lastname,
			String msdclassname);

	List<MSDStudentCheckinReportDto> getStudentCheckinReportByStudentIdAndClassId(
			Long msdstudentid, Long msdclassid);

	List<MSDStudentCheckinReportDto> getStudentAllCheckinReportByStudentId(
			Long msdstudentid);

	String checkinStudentsToClass(Long msdclassid, Date checkintime,
			String msdstudentidlist);
}
