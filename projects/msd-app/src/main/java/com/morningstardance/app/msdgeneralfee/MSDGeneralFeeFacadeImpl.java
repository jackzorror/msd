package com.morningstardance.app.msdgeneralfee;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDCostType;
import com.morningstardance.domain.entity.MSDGeneralFee;
import com.morningstardance.domain.springdata.jpa.repository.MSDCostTypeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDGeneralFeeJPARepository;

@Service("msdGeneralFeeFacade")
public class MSDGeneralFeeFacadeImpl implements MSDGeneralFeeFacade {

	@Resource
	private MSDGeneralFeeJPARepository msdGeneralFeeJPARepository;
	
	@Resource
	private MSDGeneralFeeAssembler msdGeneralFeeAssembler;
	
	@Resource
	private MSDCostTypeJPARepository msdCostTypeJPARepository;
	
	@Override
	public List<MSDGeneralFeeDto> getAllGeneralFee() {
		List<MSDGeneralFee> entities = msdGeneralFeeJPARepository.findAll();
		
		return msdGeneralFeeAssembler.createDtoFromEntity(entities);
	}

	@Override
	public MSDGeneralFeeDto createGeneralFee(MSDGeneralFeeDto dto) {
		if (null == dto) return null;
		
		MSDCostType type = msdCostTypeJPARepository.findOne(new Long(dto.getCostTypeId()));
		if (null == type) type = msdCostTypeJPARepository.findOne(new Long(99));

		MSDGeneralFee entity = new MSDGeneralFee();
		entity.setCost(new BigDecimal(dto.getCost()));
		entity.setMsdCostType(type);
		entity.setIsActive((byte) 1);
		entity.setName(dto.getFeeName());
		msdGeneralFeeJPARepository.save(entity);
		
		return msdGeneralFeeAssembler.createDtoFromEntity(entity);
	}

	@Override
	public String updateGeneralFeeNameByID(Long generalfeeid, String feename) {
		if (null == generalfeeid || feename.isEmpty()) return "";
		
		MSDGeneralFee entity = msdGeneralFeeJPARepository.findOne(generalfeeid);
		if (null == entity) return "";
		
		entity.setName(feename);
		
		msdGeneralFeeJPARepository.saveAndFlush(entity);
		
		return "successfully";
	}

}
