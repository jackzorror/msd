package com.morningstardance.app.msdcompetitionfee;

import java.util.List;

public interface MSDCompetitionFeeFacade {

	MSDCompetitionFeeDto getCompetitionFeeById(Long msdcompetitionfeeid);

	void deleteCompetitionFeeById(Long msdcompetitionfeeid);

	List<MSDCompetitionFeeDto> getCompetitionFeeByCompetitionId(Long msdcompetitionid);

	MSDCompetitionFeeDto createCompetitionFee(Long id, Long competitionId,
			String feeName, Long msdCostTypeId, float cost);

	MSDCompetitionFeeDto createCompetitionFee(
			MSDCompetitionFeeDto competitionFeeDto);

}
