package com.morningstardance.app.msdcompetition;

import java.util.List;

import com.morningstardance.app.msdcompetitionfee.MSDCompetitionSummaryDto;

public interface MSDCompetitionFacade {

	List<MSDCompetitionDto> getAllMSDCompetition();

	MSDCompetitionDto getMSDCompetitionById(Long msdCompetitionId);

	MSDCompetitionDto addCompetition(MSDCompetitionDto msdcompetitiondto);
	
	void disableCompetitionById(Long msdCompetitionId);

	MSDCompetitionSummaryDto getMSDCompetitionSummaryDtoById(Long msdCompetitionId);

	MSDCompetitionDetailDto getMSDCompetitionDetailDtoById(Long msdCompetitionId);

}
