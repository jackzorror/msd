package com.morningstardance.app.msdcompetition;

import java.math.BigDecimal;
import java.util.List;

import com.morningstardance.app.msdcompetitionfee.MSDCompetitionFeeDto;
import com.morningstardance.domain.entity.MSDCompetition;

public interface MSDCompetitionAssembler {

	MSDCompetitionDto createDtoFromEntity(MSDCompetition entity);

	MSDCompetition createEntityFromDto(MSDCompetitionDto msdcompetitiondto);

	MSDCompetitionDetailDto createDetailDtoFromEnitty(MSDCompetition entity,
			List<MSDCompetitionFeeDto> cfees, BigDecimal totalFee, Long totalStudent);

	MSDCompetitionSummaryDto createSummaryDtoFromEntity(MSDCompetition entity);

}
