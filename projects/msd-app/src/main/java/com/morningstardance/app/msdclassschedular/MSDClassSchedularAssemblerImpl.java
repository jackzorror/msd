package com.morningstardance.app.msdclassschedular;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClassSchedular;

@Service("msdClassSchedularAssembler")
public class MSDClassSchedularAssemblerImpl implements
		MSDClassSchedularAssembler {

	@Override
	public List<MSDClassSchedularDto> createDtoFromEntity(List<MSDClassSchedular> entitys) {
		List<MSDClassSchedularDto> dtos = new ArrayList<MSDClassSchedularDto>();
		for(MSDClassSchedular cs : entitys) {
			MSDClassSchedularDto dto = createDtoFromEntity(cs);
			dtos.add(dto);
		}
		return dtos;
	}

	@Override
	public MSDClassSchedularDto createDtoFromEntity(MSDClassSchedular entity) {
		MSDClassSchedularDto dto = new MSDClassSchedularDto();
		dto.setId(entity.getId().intValue());
		dto.setMscClassId(entity.getMsdClassId());
		dto.setWeekday(entity.getWeekday());
		dto.setStartTime(entity.getStartTime());
		dto.setEndTime(entity.getEndTime());

		return dto;
	}
}
