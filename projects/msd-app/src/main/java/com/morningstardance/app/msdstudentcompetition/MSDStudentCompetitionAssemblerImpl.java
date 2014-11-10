package com.morningstardance.app.msdstudentcompetition;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDStudentCompetition;

@Service("msdStudentCompetitionAssembler")
public class MSDStudentCompetitionAssemblerImpl implements
		MSDStudentCompetitionAssembler {

	@Override
	public MSDStudentCompetitionDto createDtoFromEntity(MSDStudentCompetition entity) {
		MSDStudentCompetitionDto dto = new MSDStudentCompetitionDto();
		dto.setId(entity.getId().intValue());
		dto.setMsdCompetitionId(entity.getMsdComptitionId());
		dto.setMsdStudentId(entity.getMsdStudentId());
		dto.setIsActive(entity.getIsActive() == (byte) 1);
		
		return dto;
	}

}
