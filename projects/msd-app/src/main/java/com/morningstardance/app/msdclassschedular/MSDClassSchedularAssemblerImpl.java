package com.morningstardance.app.msdclassschedular;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClassSchedular;

@Service("msdClassSchedularAssembler")
public class MSDClassSchedularAssemblerImpl implements
		MSDClassSchedularAssembler {
	
    @Resource(name="mapper")
    protected Mapper mapper;

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
		MSDClassSchedularDto dto = mapper.map(entity, MSDClassSchedularDto.class);
		return dto;
	}

	@Override
	public MSDClassSchedular createEntityFromDto(MSDClassSchedularDto dto) {
		MSDClassSchedular entity = mapper.map(dto, MSDClassSchedular.class);
		if (dto.getId() == 0)
			entity.setId(null);
		return entity;
	}
}
