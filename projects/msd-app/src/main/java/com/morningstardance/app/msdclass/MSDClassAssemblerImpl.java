package com.morningstardance.app.msdclass;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClass;

@Service("msdClassAssembler")
public class MSDClassAssemblerImpl implements MSDClassAssembler {

	@Override
	public MSDClassDto createDtoFromEntity(MSDClass msdclass) {
		MSDClassDto dto = new MSDClassDto();
		dto.setId(msdclass.getId().intValue());
		dto.setName(msdclass.getName() + " - " + msdclass.getLocation());
		return dto;
	}

	@Override
	public List<MSDClassDto> createDtoFromEntity(List<MSDClass> msdclasses) {
		List<MSDClassDto> dtos = new ArrayList<MSDClassDto>();
		for(MSDClass msdclass : msdclasses) {
			dtos.add(this.createDtoFromEntity(msdclass));
		}
		return dtos;
	}

}
