package com.morningstardance.app.msdclassfee;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClassFee;

@Service("msdClassFeeAssembler")
public class MSDClassFeeAssemblerImpl implements MSDClassFeeAssembler {

	@Override
	public MSDClassFeeDto createDtoFromEntity(MSDClassFee entity) {
		MSDClassFeeDto dto = new MSDClassFeeDto();
		dto.setId(entity.getId().intValue());
		dto.setCost(entity.getCost().floatValue());
		dto.setFeeName(entity.getName());
		dto.setFeeTypeName(entity.getMsdCostType().getName());
		dto.setMsdCostTypeId(entity.getMsdCostType().getId().intValue());
		
		return dto;
	}

}
