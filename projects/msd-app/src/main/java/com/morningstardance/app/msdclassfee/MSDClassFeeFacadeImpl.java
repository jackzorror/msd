package com.morningstardance.app.msdclassfee;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.domain.entity.MSDClassFee;
import com.morningstardance.domain.entity.MSDClassSchedular;
import com.morningstardance.domain.entity.MSDCostType;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCostTypeJPARepository;

@Service("msdClassFeeFacade")
public class MSDClassFeeFacadeImpl implements MSDClassFeeFacade {

	@Resource
	MSDClassFeeJPARepository msdClassFeeJPARepository;
	
	@Resource
	MSDCostTypeJPARepository msdCostTypeJPARepository;
	
	@Resource
	MSDClassFeeAssembler msdClassFeeAssembler;
	
	@Resource
	private MSDOperationService msdOperationService;
	
	@Override
	public MSDClassFeeDto getClasFeeById(Long msdclassfeeid) {
		MSDClassFee entity = msdClassFeeJPARepository.findOne(msdclassfeeid);
		MSDClassFeeDto dto = msdClassFeeAssembler.createDtoFromEntity(entity);
		return dto;
	}

	@Override
	public List<MSDClassFeeDto> getClassFeeByClassId(Long msdclassid) {
		if (null == msdclassid) return null;
		
		List<MSDClassFee> entities = msdClassFeeJPARepository.findByMsdClassIdAndIsActive(msdclassid.intValue(), (byte)1);
		if (null == entities || entities.size() < 1) return null;
		
		List<MSDClassFeeDto> dtos = new ArrayList<MSDClassFeeDto>();
		for (MSDClassFee entity : entities) {
			dtos.add(msdClassFeeAssembler.createDtoFromEntity(entity));
		}
		return dtos;
	}

	@Override
	public void addClassFee(Long id, Long msdClassId, String name, Long msdCostTypeId, float cost) {
		MSDClassFee entity = null;
		MSDCostType type = msdCostTypeJPARepository.findOne(msdCostTypeId);
		if (null == type) type = msdCostTypeJPARepository.findOne(new Long(99));
		
		if (id != null && id.intValue() != 0)
			entity = msdClassFeeJPARepository.findOne(id);
		if (null == entity)
			entity = new MSDClassFee();
		
		entity.setName(name);
		entity.setMsdClassId(msdClassId.intValue());
		entity.setMsdCostType(type);
		entity.setCost(new BigDecimal(cost));
		entity.setIsActive((byte) 1);
		
		msdClassFeeJPARepository.save(entity);

		msdOperationService.msdClassOperation(msdClassId, "Add Class Fee", entity.toString(), null, "DATABASE");
	}

	@Override
	public void deleteClassFeeById(Long msdClassFeeId) {
		MSDClassFee entity = msdClassFeeJPARepository.findOne(msdClassFeeId);
		if (null != entity) {
			entity.setIsActive((byte) 0);
			msdClassFeeJPARepository.save(entity);
			msdOperationService.msdClassOperation(msdClassFeeId, "De active Class Fee", null, entity.toString(), "DATABASE");
		}
	}

	
}
