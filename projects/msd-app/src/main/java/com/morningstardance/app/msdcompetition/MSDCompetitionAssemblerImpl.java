package com.morningstardance.app.msdcompetition;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDCompetition;
import com.morningstardance.domain.entity.MSDCompetitionType;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionTypeJPARepository;

@Service("msdCompetitionAssembler")
public class MSDCompetitionAssemblerImpl implements MSDCompetitionAssembler {
	
	@Resource
	private MSDCompetitionTypeJPARepository msdCompetitionTypeJPARepository;

	@Override
	public MSDCompetitionDto createDtoFromEntity(MSDCompetition entity) {
		MSDCompetitionDto dto = new MSDCompetitionDto();
		dto.setId(entity.getId().intValue());
		dto.setName(entity.getName());
		dto.setDescription(entity.getDescription());
		dto.setLocation(entity.getLocation());
		dto.setRegisterDeadline(entity.getRegisterDeadline());
		dto.setCompetitionTypeId(entity.getMsdCompetitionType().getId().intValue());
		dto.setEndDate(entity.getEndDate());
		dto.setStartDate(entity.getStartDate());
		dto.setIsActive(entity.getIsActive() == (byte) 1);
		
		return dto;
	}

	@Override
	public MSDCompetition createEntityFromDto(MSDCompetitionDto dto) {
		if (null == dto) return null;
		
		MSDCompetition entity = new MSDCompetition();
		if (dto.getId() != 0)
			entity.setId(new Long(dto.getId()));
		else
			entity.setId(null);
		
		entity.setName(dto.getName());
		entity.setLocation(dto.getLocation());
		entity.setDescription(dto.getDescription());
		entity.setIsActive(dto.getIsActive() == true ? (byte) 1 : (byte) 0);
		entity.setStartDate(dto.getStartDate());
		entity.setEndDate(dto.getEndDate());
		entity.setRegisterDeadline(dto.getRegisterDeadline());
		MSDCompetitionType ctype = msdCompetitionTypeJPARepository.findOne(new Long(dto.getCompetitionTypeId()));
		entity.setMsdCompetitionType(ctype);
		
		return entity;
	}

}
