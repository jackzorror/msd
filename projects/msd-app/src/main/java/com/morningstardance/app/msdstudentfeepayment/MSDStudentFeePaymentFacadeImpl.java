package com.morningstardance.app.msdstudentfeepayment;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDStudentFee;
import com.morningstardance.domain.entity.MSDStudentFeePayment;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentFeePaymentJPARepository;

@Service("msdStudentFeePaymentFacade")
public class MSDStudentFeePaymentFacadeImpl implements
		MSDStudentFeePaymentFacade {
	
	@Resource
	MSDStudentFeePaymentJPARepository msdStudentFeePaymentJPARepository;
	
	@Resource
	MSDStudentFeeJPARepository msdStudentFeeJPARepository;
	
	@Resource
	MSDStudentFeePaymentAssembler msdStudentFeePaymentAssembler;

	@Override
	public List<MSDStudentFeePaymentDto> getStudentFeePaymentByStudentFeeId(
			Long studentfeeid) {
		if (null == studentfeeid || studentfeeid.intValue() == 0) return null;
		
		MSDStudentFee sf = msdStudentFeeJPARepository.findOne(studentfeeid);
		if (null == sf) return null;
		
		List<MSDStudentFeePayment> sfps = msdStudentFeePaymentJPARepository.findByMsdStudentFeeId(sf.getId().intValue());
		
		List<MSDStudentFeePaymentDto> dtos = msdStudentFeePaymentAssembler.createDtosFromEntities(sfps);
		
		return dtos;
	}

	@Override
	public MSDStudentFeePaymentDto addStudentFeePaymentByDto(
			MSDStudentFeePaymentDto dto) {
		if (null == dto) return null;
		
		MSDStudentFeePayment entity = msdStudentFeePaymentAssembler.createEntityFromDto(dto);
		
		if (null != entity)
			msdStudentFeePaymentJPARepository.saveAndFlush(entity);
		
		MSDStudentFeePaymentDto newDto = msdStudentFeePaymentAssembler.createDtoFromEntity(entity);
		
		return newDto;
	}

}
