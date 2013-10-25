package com.morningstardance.app.msdclass;

import java.util.List;

import com.morningstardance.domain.entity.MSDClass;

public interface MSDClassAssembler {

	MSDClassDto createDtoFromEntity(MSDClass msdclass);

	List<MSDClassDto> createDtoFromEntity(List<MSDClass> msdclasses);

}
