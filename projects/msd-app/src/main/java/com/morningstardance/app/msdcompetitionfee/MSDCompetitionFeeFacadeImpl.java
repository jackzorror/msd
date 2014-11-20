package com.morningstardance.app.msdcompetitionfee;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.app.msdstudentfee.MSDStudentFeeFacade;
import com.morningstardance.domain.entity.MSDCompetitionFee;
import com.morningstardance.domain.entity.MSDCostType;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCostTypeJPARepository;

@Service("msdCompetitionFeeFacade")
public class MSDCompetitionFeeFacadeImpl implements MSDCompetitionFeeFacade {

	@Resource
	private MSDCompetitionFeeJPARepository msdCompetitionFeeJPARepository;
	
	@Resource
	private MSDCostTypeJPARepository msdCostTypeJPARepository;
	
	@Resource
	private MSDCompetitionFeeAssembler msdCompetitionFeeAssembler;
	
	@Resource
	private MSDStudentFeeFacade msdStudentFeeFacade;
	
	@Resource
	private MSDOperationService msdOperationService;
	
	@Override
	public MSDCompetitionFeeDto getCompetitionFeeById(Long msdcompetitionfeeid) {
		if (null == msdcompetitionfeeid || msdcompetitionfeeid.intValue() == 0) return null;
		MSDCompetitionFee entity = msdCompetitionFeeJPARepository.findOne(msdcompetitionfeeid);
		if (null == entity) return null;
		
		MSDCompetitionFeeDto dto = msdCompetitionFeeAssembler.createDtoFromEntity(entity);
		
		return dto;
	}

	@Override
	public void deleteCompetitionFeeById(Long msdcompetitionfeeid) {
		if (null == msdcompetitionfeeid || msdcompetitionfeeid.intValue() == 0) return;
		
		MSDCompetitionFee entity = msdCompetitionFeeJPARepository.findOne(msdcompetitionfeeid);
		
		if (null != entity) {
			entity.setIsActive((byte) 0);
			msdCompetitionFeeJPARepository.save(entity);
			
			msdOperationService.msdCompetitionOperation(new Long(entity.getMsdCompetitionId()), "De active competition fee ", null, entity.toString(), "DATABASE");

			msdStudentFeeFacade.removeCompetitionFeeFromStudentFeeByCompetitionFeeId(entity.getId());
		}
		
	}

	@Override
	public List<MSDCompetitionFeeDto> getCompetitionFeeByCompetitionId(Long msdcompetitionid) {
		if (null == msdcompetitionid || msdcompetitionid.intValue() == 0) return null;
		
		List<MSDCompetitionFee> entities = msdCompetitionFeeJPARepository.findByMsdCompetitionIdAndIsActive(msdcompetitionid.intValue(), (byte) 1); 
		if (null == entities || entities.size() < 0) return null;
		
		List<MSDCompetitionFeeDto> dtos = new ArrayList<MSDCompetitionFeeDto>();
		for (MSDCompetitionFee entity: entities) {
			dtos.add(msdCompetitionFeeAssembler.createDtoFromEntity(entity));
		}
		return dtos;
	}


	@Override
	public MSDCompetitionFeeDto createCompetitionFee(
			MSDCompetitionFeeDto competitionFeeDto) {
		return createCompetitionFee(new Long(competitionFeeDto.getId()), new Long(competitionFeeDto.getMsdCompetitionId()), competitionFeeDto.getFeeName(), new Long(competitionFeeDto.getMsdCostTypeId()), competitionFeeDto.getCost());
	}
	
	@Override
	public MSDCompetitionFeeDto createCompetitionFee(Long id,
			Long competitionId, String feeName, Long msdCostTypeId, float cost) {
		MSDCompetitionFeeDto dto = null;
		
		if (null == competitionId || competitionId.intValue() == 0)
			return dto;
		
		MSDCostType type = null;
		if (null == msdCostTypeId || msdCostTypeId == 0) 
			type = msdCostTypeJPARepository.findOne(new Long(99));
		else
			type = msdCostTypeJPARepository.findOne(msdCostTypeId);
		if (null == type) type = msdCostTypeJPARepository.findOne(new Long(99));
		
		MSDCompetitionFee entity = new MSDCompetitionFee();
		if (null == id || id.intValue() == 0)
			entity.setId(null);
		else
			entity.setId(id);
		entity.setCost(new BigDecimal(cost));
		entity.setIsActive((byte) 1);
		entity.setMsdCompetitionId(competitionId.intValue());
		entity.setMsdCostType(type);
		entity.setName(feeName);
		
		msdCompetitionFeeJPARepository.save(entity);
		
		msdOperationService.msdCompetitionOperation(new Long(entity.getMsdCompetitionId()), "Create competition fee ", entity.toString(), null, "DATABASE");

		msdStudentFeeFacade.addCompetitionFeeToStudentFeeByCompetitionFeeId(entity.getId());
		
		dto = msdCompetitionFeeAssembler.createDtoFromEntity(entity);
		
		return dto;
	}
}
