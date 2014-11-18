package com.morningstardance.app.msdcompetition;

import java.math.BigDecimal;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdcompetitionfee.MSDCompetitionFeeAssembler;
import com.morningstardance.app.msdcompetitionfee.MSDCompetitionFeeDto;
import com.morningstardance.domain.entity.MSDClassStatus;
import com.morningstardance.domain.entity.MSDCompetition;
import com.morningstardance.domain.entity.MSDCompetitionFee;
import com.morningstardance.domain.entity.MSDCompetitionStatus;
import com.morningstardance.domain.entity.MSDCompetitionType;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionTypeJPARepository;

@Service("msdCompetitionAssembler")
public class MSDCompetitionAssemblerImpl implements MSDCompetitionAssembler {
	
	@Resource
	private MSDCompetitionTypeJPARepository msdCompetitionTypeJPARepository;
	
	@Resource
	private MSDCompetitionFeeAssembler msdCompetitionFeeAssembler;
	

	@Override
	public MSDCompetitionDto createDtoFromEntity(MSDCompetition entity) {
		MSDCompetitionDto dto = new MSDCompetitionDto();
		dto.setId(entity.getId().intValue());
		dto.setName(entity.getName());
		dto.setDescription(entity.getDescription());
		dto.setLocation(entity.getLocation());
		dto.setRegisterDeadline(entity.getRegisterDeadline());
		dto.setCompetitionTypeId(entity.getMsdCompetitionType().getId().intValue());
		dto.setEndDate(entity.getEndDate());
		dto.setStartDate(entity.getStartDate());
		dto.setIsActive(entity.getIsActive() == (byte) 1);
		
		return dto;
	}

	@Override
	public MSDCompetition createEntityFromDto(MSDCompetitionDto dto) {
		if (null == dto) return null;
		
		MSDCompetition entity = new MSDCompetition();
		if (dto.getId() != 0)
			entity.setId(new Long(dto.getId()));
		else
			entity.setId(null);
		
		entity.setName(dto.getName());
		entity.setLocation(dto.getLocation());
		entity.setDescription(dto.getDescription());
		entity.setIsActive(dto.getIsActive() == true ? (byte) 1 : (byte) 0);
		entity.setStartDate(dto.getStartDate());
		entity.setEndDate(dto.getEndDate());
		entity.setRegisterDeadline(dto.getRegisterDeadline());
		MSDCompetitionType ctype = msdCompetitionTypeJPARepository.findOne(new Long(dto.getCompetitionTypeId()));
		entity.setMsdCompetitionType(ctype);
		
		return entity;
	}

	@Override
	public MSDCompetitionDetailDto createDetailDtoFromEnitty(
			MSDCompetition entity, List<MSDCompetitionFeeDto> cfees,
			BigDecimal totalFee, Long totalStudent) {
		
		MSDCompetitionDetailDto dto = new MSDCompetitionDetailDto();
		dto.setId(entity.getId().intValue());
		dto.setName(entity.getName());
		dto.setDescription(entity.getDescription());
		dto.setLocation(entity.getLocation());
		dto.setRegisterDeadline(entity.getRegisterDeadline());
		dto.setCompetitionTypeId(entity.getMsdCompetitionType().getId().intValue());
		dto.setEndDate(entity.getEndDate());
		dto.setStartDate(entity.getStartDate());
		dto.setIsActive(entity.getIsActive() == (byte) 1);
		dto.setTotalFee(totalFee);
		dto.setTotalStudent(null != totalStudent ? totalStudent.intValue() : 0);
		dto.setCompetitionFeeList(cfees);

		Date now = new Date(System.currentTimeMillis());
		if(now.before(entity.getRegisterDeadline())) {
			dto.setCompetitionStatus(MSDCompetitionStatus.ACCEPTREGISTER.name());
		} else if (now.after(entity.getRegisterDeadline()) && now.before(entity.getStartDate())) {
			dto.setCompetitionStatus(MSDCompetitionStatus.PASSEDREGISTERDEADLINE.name());
		} else if (now.after(entity.getStartDate()) && now.before(entity.getEndDate())) {
			dto.setCompetitionStatus(MSDCompetitionStatus.COMPETITION.name());
		} else {
			dto.setCompetitionStatus(MSDCompetitionStatus.PASSED.name());
		}
		
		
		
		return dto;
	}

	@Override
	public MSDCompetitionSummaryDto createSummaryDtoFromEntity(
			MSDCompetition entity) {
		MSDCompetitionSummaryDto dto = new MSDCompetitionSummaryDto();
		dto.setId(entity.getId().intValue());
		dto.setName(entity.getName());
		String competitiondate = new SimpleDateFormat("MM/dd/yyyy").format(entity.getStartDate()) + " ~ " + 
				new SimpleDateFormat("MM/dd/yyyy").format(entity.getEndDate()) ;
		dto.setCompetitiondate(competitiondate);
		dto.setIsactive(entity.getIsActive() == (byte) 1);

		return dto;
	}

}
