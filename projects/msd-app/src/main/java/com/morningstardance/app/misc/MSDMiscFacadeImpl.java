package com.morningstardance.app.misc;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDCompetitionType;
import com.morningstardance.domain.entity.MSDCostType;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionTypeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCostTypeJPARepository;

@Service("msdMiscFacade")
public class MSDMiscFacadeImpl implements MSDMiscFacade {

	@Resource
	private MSDCostTypeJPARepository msdCostTypeJPARepository;
	
	@Resource
	private MSDCompetitionTypeJPARepository msdCompetitionTypeJPARepository;
	
	@Override
	public List<MSDCostTypeDto> getCostType() {
		List<MSDCostTypeDto> costTypes = new ArrayList<MSDCostTypeDto>();
		List<MSDCostType> enitites = msdCostTypeJPARepository.findAll();
		for (MSDCostType type: enitites) {
			costTypes.add(new MSDCostTypeDto(type.getId().intValue(), type.getName()));
		}
		return costTypes;
	}

	@Override
	public List<MSDCompetitionTypeDto> getCompetitionType() {
		List<MSDCompetitionTypeDto> types = new ArrayList<MSDCompetitionTypeDto>();
		List<MSDCompetitionType> entities = msdCompetitionTypeJPARepository.findAll();
		for (MSDCompetitionType entity : entities) {
			types.add(new MSDCompetitionTypeDto(entity.getId().intValue(), entity.getName()));
		}
		return types;
	}

}
