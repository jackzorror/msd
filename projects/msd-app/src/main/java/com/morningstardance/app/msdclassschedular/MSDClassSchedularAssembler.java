package com.morningstardance.app.msdclassschedular;

import java.util.List;

import com.morningstardance.domain.entity.MSDClassSchedular;

public interface MSDClassSchedularAssembler {

	List<MSDClassSchedularDto> createDtoFromEntity(List<MSDClassSchedular> entitys);
	
	MSDClassSchedularDto createDtoFromEntity(MSDClassSchedular entity);

}
