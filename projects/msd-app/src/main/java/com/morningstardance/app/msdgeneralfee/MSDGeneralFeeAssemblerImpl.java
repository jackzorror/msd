package com.morningstardance.app.msdgeneralfee;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDGeneralFee;

@Service("msdGeneralFeeAssembler")
public class MSDGeneralFeeAssemblerImpl implements MSDGeneralFeeAssembler {

	@Override
	public List<MSDGeneralFeeDto> createDtoFromEntity(List<MSDGeneralFee> entities) {
		if (null == entities || entities.size() == 0) return null;
		
		List<MSDGeneralFeeDto> dtos = new ArrayList<MSDGeneralFeeDto>();
		for (MSDGeneralFee entity : entities) 
			dtos.add(createDtoFromEntity(entity));
		return dtos;
	}

	@Override
	public MSDGeneralFeeDto createDtoFromEntity(MSDGeneralFee entity) {
		if (null == entity) return null;
		MSDGeneralFeeDto dto = new MSDGeneralFeeDto();
		dto.setId(entity.getId().intValue());
		dto.setIsActive(entity.getIsActive() == (byte) 1);
		dto.setCost(entity.getCost().floatValue());
		dto.setCostTypeId(entity.getMsdCostType().getId().intValue());
		dto.setFeeName(entity.getName());
		dto.setFeeTypeName(entity.getMsdCostType().getName());
		return dto;
	}

}
