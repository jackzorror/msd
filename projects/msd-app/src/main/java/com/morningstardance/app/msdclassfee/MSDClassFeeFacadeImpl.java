package com.morningstardance.app.msdclassfee;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.app.msdstudentfee.MSDStudentFeeFacade;
import com.morningstardance.domain.entity.MSDClassFee;
import com.morningstardance.domain.entity.MSDCostType;
import com.morningstardance.domain.entity.MSDType;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCostTypeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDTypeJPARepository;

@Service("msdClassFeeFacade")
public class MSDClassFeeFacadeImpl implements MSDClassFeeFacade {

	@Resource
	MSDClassFeeJPARepository msdClassFeeJPARepository;
	
	@Resource
	MSDTypeJPARepository msdTypeJPARepository;
	
	@Resource
	MSDClassFeeAssembler msdClassFeeAssembler;
	
	@Resource
	MSDStudentFeeFacade msdStudentFeeFacade;
	
	@Resource
	private MSDOperationService msdOperationService;
	
	@Override
	public MSDClassFeeDto getClassFeeById(Long msdclassfeeid) {
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
	/*
	 * 2015/01/06 remove class fee from system
	 */
	public void addClassFee(Long id, Long msdClassId, String name, Long msdCostTypeId, float cost) {
		MSDClassFee entity = null;
		MSDType type = msdTypeJPARepository.findOne(msdCostTypeId);
		if (null == type) type = msdTypeJPARepository.findOne(new Long(99));
		
		if (id != null && id.intValue() != 0)
			entity = msdClassFeeJPARepository.findOne(id);
		if (null == entity)
			entity = new MSDClassFee();
		
		entity.setName(name);
		entity.setMsdClassId(msdClassId.intValue());
		entity.setMsdType(type);
		entity.setCost(new BigDecimal(cost));
		entity.setIsActive((byte) 1);
		
		msdClassFeeJPARepository.save(entity);

		msdOperationService.msdClassOperation(msdClassId, "Add Class Fee", entity.toString(), null, "DATABASE");
	}

	public void addClassFee(Long id, Long msdClassId, String name, Long msdCostTypeId, float cost, float oneTimePay, float monthlyPay, float weeklyPay, float dailyPay) {
		MSDClassFee entity = null;
		MSDType type = msdTypeJPARepository.findOne(msdCostTypeId);
		if (null == type) type = msdTypeJPARepository.findOne(new Long(99));
		
		if (id != null && id.intValue() != 0)
			entity = msdClassFeeJPARepository.findOne(id);
		if (null == entity)
			entity = new MSDClassFee();
		
		entity.setName(name);
		entity.setMsdClassId(msdClassId.intValue());
		entity.setMsdType(type);
		entity.setCost(new BigDecimal(cost));
		entity.setIsActive((byte) 1);
		entity.setOneTimePay(new BigDecimal(oneTimePay));
		entity.setMonthlyPay(new BigDecimal(monthlyPay));
		entity.setWeeklyPay(new BigDecimal(weeklyPay));
		entity.setDailyPay(new BigDecimal(dailyPay));
		
		
		msdClassFeeJPARepository.save(entity);

		msdOperationService.msdClassOperation(msdClassId, "Add Class Fee", entity.toString(), null, "DATABASE");
	}

	@Override
	/*
	 * 2015/01/06 remove class fee from system
	 */
	public void deleteClassFeeById(Long msdClassFeeId) {
		if (null == msdClassFeeId || msdClassFeeId.intValue() == 0) return;
		
		MSDClassFee entity = msdClassFeeJPARepository.findOne(msdClassFeeId);
		if (null == entity) return;
		
		entity.setIsActive((byte) 0);
		msdClassFeeJPARepository.save(entity);
		
		msdOperationService.msdClassOperation(new Long(entity.getMsdClassId()), "De active Class Fee", null, entity.toString(), "DATABASE");
	}
}
