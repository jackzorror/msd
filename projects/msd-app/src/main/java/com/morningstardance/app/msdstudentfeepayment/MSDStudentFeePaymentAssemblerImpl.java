package com.morningstardance.app.msdstudentfeepayment;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDStudentFeePayment;

@Service("msdStudentFeePaymentAssembler")
public class MSDStudentFeePaymentAssemblerImpl implements
		MSDStudentFeePaymentAssembler {

	@Override
	public List<MSDStudentFeePaymentDto> createDtosFromEntities(
			List<MSDStudentFeePayment> sfps) {
		if (null == sfps || sfps.size() == 0) return null;
		
		List<MSDStudentFeePaymentDto> dtos = new ArrayList<MSDStudentFeePaymentDto>();
		for(MSDStudentFeePayment sfp : sfps) {
			dtos.add(createDtoFromEntity(sfp));
		}
		return dtos;
	}

	@Override
	public MSDStudentFeePaymentDto createDtoFromEntity(
			MSDStudentFeePayment entity) {
		if (null == entity) return null;
		
		MSDStudentFeePaymentDto dto = new MSDStudentFeePaymentDto();
		dto.setId(entity.getId().intValue());
		dto.setMsdStudentFeeId(entity.getMsdStudentFeeId());
		dto.setPayFee(entity.getPayFee().floatValue());
		dto.setPayNote(entity.getPayNote());
		dto.setPayTime(entity.getPayTime());
		dto.setPayType(entity.getPayType());
		dto.setFee(entity.getFee().floatValue());
		dto.setFeeDescription(entity.getFeeDescription());
		
		return dto;
	}

	@Override
	public MSDStudentFeePayment createEntityFromDto(MSDStudentFeePaymentDto dto) {
		if (null == dto) return null;
		MSDStudentFeePayment entity = new MSDStudentFeePayment();
		if (dto.getId() == 0) 
			entity.setId(null);
		else 
			entity.setId(new Long(dto.getId()));
		entity.setFee(dto.getFee() != 0.0 ? new BigDecimal(dto.getFee()) : null);
		entity.setFeeDescription(null);
		entity.setMsdStudentFeeId(dto.getMsdStudentFeeId());
		entity.setPayFee(dto.getPayFee() != 0.0 ? new BigDecimal(dto.getPayFee()) : null);
		entity.setPayNote(dto.getPayNote());
		entity.setPayTime(dto.getPayTime());
		entity.setPayType(dto.getPayType());
		entity.setFeeDescription(dto.getFeeDescription());
		
		return entity;
	}

}
