package com.morningstardance.app.msdclass;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.dozer.Mapper;
import org.springframework.stereotype.Service;

import com.morningstardance.app.msdclassfee.MSDClassFeeAssembler;
import com.morningstardance.app.msdclassschedular.MSDClassSchedularAssembler;
import com.morningstardance.app.util.WeekdayEnum;
import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDClassFee;
import com.morningstardance.domain.entity.MSDClassNonClassDate;
import com.morningstardance.domain.entity.MSDClassSchedular;
import com.morningstardance.domain.entity.MSDClassStatus;

@Service("msdClassAssembler")
public class MSDClassAssemblerImpl implements MSDClassAssembler {
	
    @Resource(name="mapper")
    protected Mapper mapper;
    
    @Resource
    private MSDClassSchedularAssembler msdClassSchedularAssembler;
    
    @Resource
    private MSDClassFeeAssembler msdClassFeeAssembler;
    
/*
	@Override
	public MSDClassSummaryDto createSummaryDtoFromEntity(MSDClass msdclass) {
		MSDClassSummaryDto dto = new MSDClassSummaryDto();
		dto.setId(msdclass.getId().intValue());
		dto.setName(msdclass.getName() + " - " + msdclass.getLocation());
		return dto;
	}

	@Override
	public List<MSDClassSummaryDto> createSummaryDtoFromEntity(List<MSDClass> msdclasses) {
		List<MSDClassSummaryDto> dtos = new ArrayList<MSDClassSummaryDto>();
		for(MSDClass msdclass : msdclasses) {
			dtos.add(this.createSummaryDtoFromEntity(msdclass));
		}
		return dtos;
	}
*/
	@Override
	public MSDClassSummaryDto createSummaryDtoFromEntity(MSDClass msdclass, List<MSDClassSchedular> msdclassschedulars) {
		MSDClassSummaryDto dto = new MSDClassSummaryDto();
		dto.setId(msdclass.getId().intValue());
		dto.setName(msdclass.getName() + " - " + msdclass.getLocation());
		dto.setIsactive((byte)1 == msdclass.getIsActive());
		StringBuffer schedular = new StringBuffer();
		for (MSDClassSchedular s : msdclassschedulars) {
			schedular.append(WeekdayEnum.getWeekdayString(s.getWeekday()) + " " + s.getStartTime() + "~" + s.getEndTime() + "; ");
		}
		dto.setSchedule(schedular.toString());
		
		return dto;
	}

	@Override
	public MSDClass createEntityFromDto(MSDClassDto dto) {
		MSDClass entity = new MSDClass();
		if (dto.getId() != 0)
			entity.setId(new Long(dto.getId()));
		else 
			entity.setId(null);
		entity.setName(dto.getName());
		entity.setLocation(dto.getLocation());
		entity.setClassStartTime(dto.getClassStartTime());
		entity.setClassEndTime(dto.getClassEndTime());
		if (dto.isIsactive()) {
			entity.setIsActive((byte)1);
		} else {
			entity.setIsActive((byte)0);
		}
		if (StringUtils.isNotEmpty(dto.getClassStatus())) {
			entity.setClassStatus(dto.getClassStatus());
		} else {
			Date now = new Date(System.currentTimeMillis());
			if(now.before(dto.getClassStartTime())) {
				entity.setClassStatus(MSDClassStatus.INACTIVE.name());
			} else if (now.after(dto.getClassStartTime()) && now.before(dto.getClassEndTime())) {
				entity.setClassStatus(MSDClassStatus.ACTIVE.name());
			} else if (now.after(dto.getClassEndTime())) {
				entity.setClassStatus(MSDClassStatus.EXPIRED.name());
			}
		}
		return entity;
	}

	@Override
	public MSDClassDto createDtoFromEntity(MSDClass msdclass) {
		MSDClassDto dto = new MSDClassDto();
		dto.setId(msdclass.getId().intValue());
		dto.setName(msdclass.getName());
		dto.setLocation(msdclass.getLocation());
		dto.setClassStatus(msdclass.getClassStatus());
		dto.setClassStartTime(msdclass.getClassStartTime());
		dto.setClassEndTime(msdclass.getClassEndTime());
		dto.setIsactive((byte)1 == msdclass.getIsActive());
		return dto;
	}

	@Override
	public MSDClassDetailDto createClassDetailFromEntity(MSDClass msdclass,
			List<MSDClassSchedular> msdclassschedulars, List<MSDClassFee> msdclassfees, List<MSDClassNonClassDate> msdnonclassdates, Long totalStudentCount, BigDecimal totalClassFee, int totalClassCount) {
		MSDClassDetailDto dto = new MSDClassDetailDto();
		dto.setId(msdclass.getId().intValue());
		dto.setName(msdclass.getName());
		dto.setLocation(msdclass.getLocation());

		Date now = new Date(System.currentTimeMillis());
		if(now.before(msdclass.getClassStartTime())) {
			dto.setClassStatus(MSDClassStatus.INACTIVE.name());
		} else if (now.after(msdclass.getClassStartTime()) && now.before(msdclass.getClassEndTime())) {
			dto.setClassStatus(MSDClassStatus.ACTIVE.name());
		} else if (now.after(msdclass.getClassEndTime())) {
			dto.setClassStatus(MSDClassStatus.EXPIRED.name());
		}
		
		dto.setClassStartTime(msdclass.getClassStartTime());
		dto.setClassEndTime(msdclass.getClassEndTime());
		dto.setIsactive((byte)1 == msdclass.getIsActive());

		dto.setClassSchedularList(msdClassSchedularAssembler.createDtoFromEntity(msdclassschedulars));
		dto.setClassFeeList(msdClassFeeAssembler.createDtoFromEntity(msdclassfees));
		dto.setNonClassDateList(msdnonclassdates);
		
		dto.setTotalNumberStudent(null != totalStudentCount ? totalStudentCount.intValue() : 0);
		dto.setTotalClassFee(totalClassFee);
		dto.setTotalClassCount(totalClassCount);
		
		return dto;
	}

}
