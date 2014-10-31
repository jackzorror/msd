package com.morningstardance.app.msdcompetitionfee;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDCompetitionFee;

@Service("msdCompetitionFeeAssembler")
public class MSDCompetitionFeeAssemblerImpl implements
		MSDCompetitionFeeAssembler {

	@Override
	public MSDCompetitionFeeDto createDtoFromEntity(MSDCompetitionFee entity) {
		if (null == entity) return null;
		
		MSDCompetitionFeeDto dto = new MSDCompetitionFeeDto();
		dto.setId(entity.getId().intValue());
		dto.setCost(entity.getCost().floatValue());
		dto.setFeeName(entity.getName());
		dto.setFeeTypeName(entity.getMsdCostType().getName());
		dto.setMsdCompetitionId(entity.getMsdCompetitionId());
		dto.setMsdCostTypeId(entity.getMsdCostType().getId().intValue());
		
		return dto;
	}

}
