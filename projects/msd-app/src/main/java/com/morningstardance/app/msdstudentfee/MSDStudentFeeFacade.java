package com.morningstardance.app.msdstudentfee;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;

public interface MSDStudentFeeFacade {

//	void addClassFeeToStudentFeeByStudentIdAndStudentClassId(Long sid, Long cid);

	void addCompetitionFeeToStudentFeeByStudentIdAndStudentCompetitionId(Long msdStudentId, Long id);

//	void removeClassFeeFromStudentFeeByStudentIdAndStudentClassId(Long sid, Long cid);

	void removeCompetitionFeeFromStudentFeeByStudentIdAndStudentCompetitionId(Long msdtudentid, Long scid);

//	void removeClassFeeFromStudentFeeByClassFeeId(Long msdClassFeeId);

	void removeCompetitionFeeFromStudentFeeByCompetitionFeeId(Long msdCompetitionFeeId);

//	void addClassFeeToStudentFeeByClassFeeId(Long msdClassFeeId);
	
	void addCompetitionFeeToStudentFeeByCompetitionFeeId(Long msdCompetitionFeeId);

	List<MSDStudentFeeSummaryDto> getStudentFeeSummarysByStudentId(Long id);

	MSDStudentFeeDetailDto getStudentFeeDetailDtoById(Long msdstudentfeeid);

	MSDStudentFeeDto getStudentFeeDtoById(Long msdstudentfeeid);

	String payStudentFeesByStudentIdAndFeeInfo(Long msdstudentid,
			String feeidlist, double totalfee, String paytype,
			Date paytime, String paynote);

	String payStudentFeesByStudentPayDto(MSDStudentFeePayDto msdStudentFeePayDto);

	String addFeeToStudentFeeByStudentIdAndFeeIdListAndType(Long msdstudentid,
			Long feeid, String feenote, String type, double fee, Long semesterid);

	List<MSDStudentFeeSummaryDto> getStudentFeeSummarysByStudentIdAndSemesterId(
			Long studentid, Long semesterid);

	String payStudentFees(List<LinkedHashMap> dtos);
}
