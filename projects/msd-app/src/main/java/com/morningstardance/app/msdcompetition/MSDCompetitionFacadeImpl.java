package com.morningstardance.app.msdcompetition;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.domain.entity.MSDCompetition;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionJPARepository;

@Service("msdCompetitionFacade")
public class MSDCompetitionFacadeImpl implements MSDCompetitionFacade {

	@Resource
	private MSDCompetitionJPARepository msdCompetitionJPARepository;
	
	@Resource
	private MSDCompetitionAssembler msdCompetitionAssembler;
	
	@Resource
	private MSDOperationService msdOperationService;
	
	@Override
	public List<MSDCompetitionDto> getAllMSDCompetition() {
		List<MSDCompetitionDto> dtos = null;
		List<MSDCompetition> entities = msdCompetitionJPARepository.findAll();
		
		if (null != entities && entities.size() > 0) {
			dtos = new ArrayList<MSDCompetitionDto>();
			for (MSDCompetition entity : entities) {
				dtos.add(msdCompetitionAssembler.createDtoFromEntity(entity));
			}
		}
		return dtos; 
	}

	@Override
	public MSDCompetitionDto getMSDCompetitionById(Long msdCompetitionId) {
		if (null == msdCompetitionId || msdCompetitionId.intValue() == 0) return null;
		
		MSDCompetitionDto dto = null;
		MSDCompetition entity = msdCompetitionJPARepository.findOne(msdCompetitionId);
		if (null != entity) {
			dto = msdCompetitionAssembler.createDtoFromEntity(entity);
		}
		return dto;
	}

	@Override
	public MSDCompetitionDto addCompetition(MSDCompetitionDto msdcompetitiondto) {
		
		if (null == msdcompetitiondto) return null;
		
		String ovalue = null;
		if (msdcompetitiondto.getId() != 0) {
			MSDCompetition oentity = msdCompetitionJPARepository.findOne(new Long(msdcompetitiondto.getId()));
			if (null != oentity)
				ovalue = oentity.toString();
		}
		
		MSDCompetition entity = msdCompetitionAssembler.createEntityFromDto(msdcompetitiondto);
		msdCompetitionJPARepository.save(entity);
		MSDCompetitionDto dto = msdCompetitionAssembler.createDtoFromEntity(entity);
		
		if (msdcompetitiondto.getId() == 0) {
			msdOperationService.msdCompetitionOperation(entity.getId(), "Create New Competition", entity.toString(), null, "DATABASE");
		} else {
			msdOperationService.msdCompetitionOperation(entity.getId(), "Change Class", entity.toString(), ovalue, "DATABASE");
		}
		return dto;
	}

	@Override
	public void disableCompetitionById(Long msdCompetitionId) {
		if (null == msdCompetitionId || msdCompetitionId.intValue() == 0) return;
		
		MSDCompetition entity = msdCompetitionJPARepository.findOne(msdCompetitionId);
		if (null == entity) return;
		
		entity.setIsActive((byte) 0);
		
		msdCompetitionJPARepository.save(entity);
		
		msdOperationService.msdCompetitionOperation(entity.getId(), "Disable Competition", entity.toString(), null, "DATABASE");
	}

}
