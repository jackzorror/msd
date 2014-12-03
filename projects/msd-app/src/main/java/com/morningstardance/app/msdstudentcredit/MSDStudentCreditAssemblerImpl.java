package com.morningstardance.app.msdstudentcredit;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDStudentCredit;

@Service("msdStudentCreditAssembler")
public class MSDStudentCreditAssemblerImpl implements MSDStudentCreditAssembler {

	@Override
	public MSDStudentCreditSummaryDto createSummaryDtoFromEntity(MSDStudentCredit credit) {
		if (null == credit) return null;
		MSDStudentCreditSummaryDto dto = new MSDStudentCreditSummaryDto();
		dto.setId(credit.getId().intValue());
		dto.setIsActive(credit.getIsActive() == (byte) 1);
		dto.setIsConsumed(credit.getIsConsumed() == (byte) 1);
		dto.setCredit(credit.getCredit().floatValue());
		dto.setMsdStudentId(credit.getMsdStudentId());
		dto.setCreditNote(credit.getCreditNote());
		
		return dto;
	}

	@Override
	public List<MSDStudentCreditSummaryDto> createSummaryDtoFromEntity(List<MSDStudentCredit> credits) {
		if (null == credits || credits.size() == 0) return null;
		
		List<MSDStudentCreditSummaryDto> dtos = new ArrayList<MSDStudentCreditSummaryDto>();
		for (MSDStudentCredit credit : credits) {
			dtos.add(createSummaryDtoFromEntity(credit));
		}
		return dtos;
	}

	@Override
	public MSDStudentCredit createEntityFromDto(MSDStudentCreditDto dto) {
		if (null == dto) return null;
		
		MSDStudentCredit entity = new MSDStudentCredit();
		entity.setConsumedDate(dto.getConsumedDate());
		entity.setConsumeNote(dto.getConsumeNote());
		entity.setCredit(new BigDecimal(dto.getCredit()));
		entity.setCreditNote(dto.getCreditNote());
		entity.setIsActive(dto.getIsActive() ? (byte) 1 : (byte) 0);
		entity.setIsConsumed(dto.getIsConsumed() ? (byte) 1 : (byte) 0);
		entity.setMsdStudentId(dto.getMsdStudentId());
		entity.setId(dto.getId() == 0 ? null : new Long(dto.getId()));
		
		return entity;
	}

	@Override
	public MSDStudentCreditDto createDtoFromEntity(MSDStudentCredit entity) {
		if (null == entity) return null;
		
		MSDStudentCreditDto dto = new MSDStudentCreditDto();
		dto.setId(entity.getId().intValue());
		dto.setConsumedDate(entity.getConsumedDate());
		dto.setConsumeNote(entity.getConsumeNote());
		dto.setCredit(entity.getCredit().floatValue());
		dto.setCreditDate(entity.getCreditDate());
		dto.setCreditNote(entity.getCreditNote());
		dto.setIsActive(entity.getIsActive() == (byte) 1);
		dto.setIsConsumed(entity.getIsConsumed() == (byte) 1);
		dto.setMsdStudentId(entity.getMsdStudentId());
		
		return dto;
	}

}
