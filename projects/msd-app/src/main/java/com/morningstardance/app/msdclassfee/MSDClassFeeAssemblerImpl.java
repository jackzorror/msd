package com.morningstardance.app.msdclassfee;

import java.util.ArrayList;
import java.util.List;

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

	@Override
	public List<MSDClassFeeDto> createDtoFromEntity(List<MSDClassFee> msdclassfees) {
		if (null == msdclassfees || msdclassfees.size() == 0) return null;
		
		List<MSDClassFeeDto> dtos = new ArrayList<MSDClassFeeDto>();
		for (MSDClassFee cf : msdclassfees) {
			dtos.add(createDtoFromEntity(cf));
		}
		return dtos;
	}

}
