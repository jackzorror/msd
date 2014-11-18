package com.morningstardance.app.msdcompetition;

import java.util.List;

public interface MSDCompetitionFacade {

	List<MSDCompetitionDto> getAllMSDCompetition();

	MSDCompetitionDto getMSDCompetitionById(Long msdCompetitionId);

	MSDCompetitionDto addCompetition(MSDCompetitionDto msdcompetitiondto);
	
	void disableCompetitionById(Long msdCompetitionId);

	MSDCompetitionSummaryDto getMSDCompetitionSummaryDtoById(Long msdCompetitionId);

	MSDCompetitionDetailDto getMSDCompetitionDetailDtoById(Long msdCompetitionId);

	List<MSDCompetitionSummaryDto> getCompetitionSummaryDtoByStudentIdAndType(
			Long msdstudentid, String type);

	List<MSDCompetitionSummaryDto> getStudentNonRegisterCompetitionSummaryDtoByStudentId(Long msdstudentid);

	List<MSDCompetitionSummaryDto> getStudentRegisterCompetitionSummaryDtoByStudentId(Long msdstudentid);

	MSDCompetitionDto getMSDCompetitionDtoById(Long msdCompetitionId);
}
