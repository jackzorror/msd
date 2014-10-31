package com.morningstardance.app.msdcompetition;

import java.util.List;

public interface MSDCompetitionFacade {

	List<MSDCompetitionDto> getAllMSDCompetition();

	MSDCompetitionDto getMSDCompetitionById(Long msdCompetitionId);

	MSDCompetitionDto addCompetition(MSDCompetitionDto msdcompetitiondto);
	
	void disableCompetitionById(Long msdCompetitionId);

}
