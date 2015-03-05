package com.morningstardance.app.msdgeneralfee;

import java.math.BigDecimal;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDCostType;
import com.morningstardance.domain.entity.MSDGeneralFee;
import com.morningstardance.domain.entity.MSDType;
import com.morningstardance.domain.springdata.jpa.repository.MSDCostTypeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDGeneralFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDTypeJPARepository;

@Service("msdGeneralFeeFacade")
public class MSDGeneralFeeFacadeImpl implements MSDGeneralFeeFacade {

	@Resource
	private MSDGeneralFeeJPARepository msdGeneralFeeJPARepository;
	
	@Resource
	private MSDGeneralFeeAssembler msdGeneralFeeAssembler;
	
	@Resource
	private MSDTypeJPARepository msdTypeJPARepository;
		
	@Override
	public List<MSDGeneralFeeDto> getAllGeneralFee() {
		List<MSDGeneralFee> entities = msdGeneralFeeJPARepository.findAll();
		
		return msdGeneralFeeAssembler.createDtoFromEntity(entities);
	}

	@Override
	public MSDGeneralFeeDto createGeneralFee(MSDGeneralFeeDto dto) {
		if (null == dto) return null;
		
		MSDType type = msdTypeJPARepository.findOne(new Long(dto.getCostTypeId()));
		if (null == type) type = msdTypeJPARepository.findOne(new Long(999));

		MSDGeneralFee entity = new MSDGeneralFee();
		entity.setCost(new BigDecimal(dto.getCost()));
		entity.setMsdFeeType(type);
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
