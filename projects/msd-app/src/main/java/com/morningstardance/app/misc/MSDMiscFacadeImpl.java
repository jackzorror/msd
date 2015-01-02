package com.morningstardance.app.misc;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDCompetitionType;
import com.morningstardance.domain.entity.MSDCostType;
import com.morningstardance.domain.entity.MSDType;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionTypeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCostTypeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDTypeJPARepository;

@Service("msdMiscFacade")
public class MSDMiscFacadeImpl implements MSDMiscFacade {

	@Resource
	private MSDCostTypeJPARepository msdCostTypeJPARepository;
	
	@Resource
	private MSDCompetitionTypeJPARepository msdCompetitionTypeJPARepository;
	
	@Resource
	private MSDTypeJPARepository msdTypeJPARepository;
	
	@Override
	public List<MSDTypeDto> getCostType() {
		List<MSDTypeDto> costTypes = new ArrayList<MSDTypeDto>();
		List<MSDCostType> enitites = msdCostTypeJPARepository.findAll();
		for (MSDCostType type: enitites) {
			costTypes.add(new MSDTypeDto(type.getId().intValue(), type.getName()));
		}
		return costTypes;
	}

	@Override
	public List<MSDTypeDto> getCompetitionType() {
		List<MSDTypeDto> types = new ArrayList<MSDTypeDto>();
		List<MSDCompetitionType> entities = msdCompetitionTypeJPARepository.findAll();
		for (MSDCompetitionType entity : entities) {
			types.add(new MSDTypeDto(entity.getId().intValue(), entity.getName()));
		}
		return types;
	}

	private List<MSDTypeDto> getTypesByType(String type) {
		List<MSDTypeDto> types = new ArrayList<MSDTypeDto>();
		List<MSDType> ts = msdTypeJPARepository.findByType(type);
		for (MSDType t : ts) {
			types.add(new MSDTypeDto(t.getId().intValue(), t.getName()));
		}
		return types;
	}
}
