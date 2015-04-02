package com.morningstardance.app.msdstudentfee;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDClassFee;
import com.morningstardance.domain.entity.MSDCompetition;
import com.morningstardance.domain.entity.MSDCompetitionFee;
import com.morningstardance.domain.entity.MSDGeneralFee;
import com.morningstardance.domain.entity.MSDStudentFee;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDGeneralFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentFeeJPARepository;

@Service("msdStudentFeeAssembler")
public class MSDStudentFeeAssemblerImpl implements MSDStudentFeeAssembler {
	
	@Resource
	private MSDStudentFeeJPARepository msdStudentFeeJPARepository;
	
	@Resource
	private MSDClassFeeJPARepository msdClassFeeJPARepository;
	
	@Resource
	private MSDClassJPARepository msdClassJPARepository;
	
	@Resource
	private MSDCompetitionFeeJPARepository msdCompetitionFeeJPARepository;
	
	@Resource
	private MSDCompetitionJPARepository msdCompetitionJPARepository;
	
	@Resource
	private MSDGeneralFeeJPARepository msdGeneralFeeJPARepositoryt;

	@Override
	public MSDStudentFeeDto createDtoFromEntity(MSDStudentFee sfee) {
		if (null == sfee) return null;
		
		MSDStudentFeeDto dto = new MSDStudentFeeDto();
		dto.setId(sfee.getId().intValue());
		dto.setIsActive(sfee.getIsActive() == (byte) 1);
		dto.setIsPaid(sfee.getIsPaid() == (byte) 1);
		dto.setIsWaiver(sfee.getIsWaiver() == (byte) 1);
		
		dto.setMsdStudentFeeObjectId(sfee.getMsdStudentFeeObjectId());
		dto.setMsdStudentFeeObjectName(sfee.getMsdStudentFeeObjectName());
		dto.setMsdStudentId(sfee.getMsdStudentId());
		dto.setFeeNote(sfee.getFeeNote());
		dto.setFee(sfee.getFee().doubleValue());
		
		return dto;
	}

	@Override
	public List<MSDStudentFeeDto> createDtoFromEntity(List<MSDStudentFee> sfees) {
		if (null == sfees || sfees.size() == 0) return null;
		List<MSDStudentFeeDto> dtos = new ArrayList<MSDStudentFeeDto>();
		
		for (MSDStudentFee sfee : sfees) {
			dtos.add(createDtoFromEntity(sfee));
		}
		return dtos;
	}

	@Override
	public MSDStudentFeeSummaryDto createSummaryDtoFromEntity(MSDStudentFee sfee) {
		if (null == sfee) return null;
		
		MSDStudentFeeSummaryDto dto = new MSDStudentFeeSummaryDto();
		dto.setId(sfee.getId().intValue());
		dto.setIsPaid(sfee.getIsPaid() == (byte) 1);
		dto.setIsWaiver(sfee.getIsWaiver() == (byte) 1);
		dto.setFeeNote(sfee.getFeeNote());
		dto.setFee(sfee.getFee().doubleValue());
		getStudentFeeGroupAndName(dto, sfee);
		
		return dto;
	}

	private void getStudentFeeGroupAndName(MSDStudentFeeSummaryDto dto,MSDStudentFee sfee) {
		if (null == sfee || null == dto) return;
		
		if (null == sfee.getMsdStudentFeeObjectName() || sfee.getMsdStudentFeeObjectName().isEmpty()) return;
		
		if (sfee.getMsdStudentFeeObjectId() == 0) return;
		
		if (MSDClassFee.class.getSimpleName().equals(sfee.getMsdStudentFeeObjectName())) {
			MSDClassFee cfee = msdClassFeeJPARepository.findOne(new Long(sfee.getMsdStudentFeeObjectId()));
			if (null != cfee && cfee.getIsActive() == (byte) 1) {
				dto.setFeeName(cfee.getName());
			}
			if (null != cfee && null != cfee.getMsdType()) {
				dto.setFeeTypeName(cfee.getMsdType().getName());
			}
			
			MSDClass c = msdClassJPARepository.findOne(new Long(cfee.getMsdClassId()));
			if (null != c && c.getIsActive() == (byte) 1) 
				dto.setFeeObjectName(c.getName());
		} else if (MSDCompetitionFee.class.getSimpleName().equals(sfee.getMsdStudentFeeObjectName())) {
			MSDCompetitionFee cfee = msdCompetitionFeeJPARepository.findOne(new Long(sfee.getMsdStudentFeeObjectId()));
			if (null != cfee && cfee.getIsActive() == (byte) 1) {
				dto.setFeeName(cfee.getName());
				// there is problem for msdtype and msdcosttype in here
			}
			MSDCompetition c = msdCompetitionJPARepository.findOne(new Long(cfee.getMsdCompetitionId()));
			if (null != c && c.getIsActive() == (byte) 1) 
				dto.setFeeObjectName(c.getName());
		} else {
			MSDGeneralFee gfee = msdGeneralFeeJPARepositoryt.findOne(new Long(sfee.getMsdStudentFeeObjectId()));
			if (null != gfee && gfee.getIsActive() == (byte) 1) {
				dto.setFeeName(gfee.getName());
				dto.setFeeObjectName("Gernal Student Fee");
				dto.setFeeTypeName(gfee.getMsdFeeType().getName());
			}
		}
	}

	@Override
	public List<MSDStudentFeeSummaryDto> createSummaryDtoFromEntity(
			List<MSDStudentFee> sfees) {
		if (null == sfees || sfees.size() == 0) return null;
		
		List<MSDStudentFeeSummaryDto> dtos = new ArrayList<MSDStudentFeeSummaryDto>();
		
		for (MSDStudentFee sfee : sfees) {
			dtos.add(createSummaryDtoFromEntity(sfee));
		}
		return dtos;
	}

	@Override
	public MSDStudentFeeDetailDto createDetailDtoFromEntity(MSDStudentFee sfee) {
		if (null == sfee) return null;
		
		MSDStudentFeeDetailDto dto = new MSDStudentFeeDetailDto();
		dto.setId(sfee.getId().intValue());
		dto.setIsPaid(sfee.getIsPaid() == (byte) 1);
		dto.setIsWaiver(sfee.getIsWaiver() == (byte) 1);
		dto.setFeeNote(sfee.getFeeNote());
		dto.setFee(sfee.getFee().doubleValue());
		getStudentFeeGroupAndName(dto, sfee);
		
		return dto;
	}
}
