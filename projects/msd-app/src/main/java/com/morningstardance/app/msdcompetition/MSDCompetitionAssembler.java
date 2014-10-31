package com.morningstardance.app.msdcompetition;

import com.morningstardance.domain.entity.MSDCompetition;

public interface MSDCompetitionAssembler {

	MSDCompetitionDto createDtoFromEntity(MSDCompetition entity);

	MSDCompetition createEntityFromDto(MSDCompetitionDto msdcompetitiondto);

}
