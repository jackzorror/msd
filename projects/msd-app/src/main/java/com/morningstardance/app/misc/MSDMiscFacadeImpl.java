package com.morningstardance.app.misc;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDCostType;
import com.morningstardance.domain.springdata.jpa.repository.MSDCostTypeJPARepository;

@Service("msdMiscFacade")
public class MSDMiscFacadeImpl implements MSDMiscFacade {

	@Resource
	private MSDCostTypeJPARepository msdCostTypeJPARepository;
	
	@Override
	public List<MSDCostTypeDto> getCostType() {
		List<MSDCostTypeDto> costTypes = new ArrayList<MSDCostTypeDto>();
		List<MSDCostType> enitites = msdCostTypeJPARepository.findAll();
		for (MSDCostType type: enitites) {
			costTypes.add(new MSDCostTypeDto(type.getId().intValue(), type.getName()));
		}
		return costTypes;
	}

}
