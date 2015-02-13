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
import com.morningstardance.domain.entity.MSDSemester;
import com.morningstardance.domain.entity.MSDType;
import com.morningstardance.domain.springdata.jpa.repository.MSDSemesterJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDTypeJPARepository;

@Service("msdClassAssembler")
public class MSDClassAssemblerImpl implements MSDClassAssembler {
	
    @Resource(name="mapper")
    protected Mapper mapper;
    
    @Resource
    private MSDClassSchedularAssembler msdClassSchedularAssembler;
    
    @Resource
    private MSDClassFeeAssembler msdClassFeeAssembler;
    
    @Resource
    private MSDSemesterJPARepository msdSemesterJPARepository;

	@Resource
	private MSDTypeJPARepository msdTypeJPARepository;
	

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
		dto.setName(msdclass.getName() + " - " + getSemesterNameById(msdclass.getSemesterId()));
		dto.setSemesterid(msdclass.getSemesterId());
		dto.setIsactive((byte)1 == msdclass.getIsActive());
		dto.setTypeid(msdclass.getClassTypeId());
		MSDType type = msdTypeJPARepository.findOne(new Long(msdclass.getClassTypeId()));
		dto.setClassTypeName(null != type ? type.getName() : "");
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
		entity.setSemesterId(dto.getSemester());
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
		dto.setSemester(msdclass.getSemesterId());
		dto.setTypeid(msdclass.getClassTypeId());
		dto.setSemesterName(getSemesterNameById(msdclass.getSemesterId()));
		
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
		
		dto.setSemester(msdclass.getSemesterId());
		dto.setSemesterName(getSemesterNameById(msdclass.getSemesterId()));
		
		dto.setTypeid(msdclass.getClassTypeId());
		dto.setTypeName(getClassTypeNameById(msdclass.getClassTypeId()));

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

	private String getClassTypeNameById(int classTypeId) {
		if (classTypeId != 0) {
			MSDType t = msdTypeJPARepository.findOne(new Long(classTypeId));
			if (null != t)
				return t.getName();
		}
		return null;
	}

	private String getSemesterNameById(int semesterid) {
		if (semesterid != 0) {
			MSDSemester s = msdSemesterJPARepository.findOne(new Long(semesterid));
			if(null != s) 
				return s.getName();
		}
		
		return null;
	}

	@Override
	public MSDClass createEntityFromDto(MSDAddClassDto dto) {
		MSDClass entity = new MSDClass();
		if (dto.getId() != 0)
			entity.setId(new Long(dto.getId()));
		else 
			entity.setId(null);
		entity.setName(dto.getName());
		entity.setSemesterId(dto.getSemesterId());
		entity.setClassTypeId(dto.getClassTypeId());
		entity.setClassStartTime(dto.getClassStartTime());
		entity.setClassEndTime(dto.getClassEndTime());
		entity.setLocation("");
		if (dto.getIsActive()) {
			entity.setIsActive((byte)1);
		} else {
			entity.setIsActive((byte)0);
		}

		Date now = new Date(System.currentTimeMillis());
		if(now.before(dto.getClassStartTime())) {
			entity.setClassStatus(MSDClassStatus.INACTIVE.name());
		} else if (now.after(dto.getClassStartTime()) && now.before(dto.getClassEndTime())) {
			entity.setClassStatus(MSDClassStatus.ACTIVE.name());
		} else if (now.after(dto.getClassEndTime())) {
			entity.setClassStatus(MSDClassStatus.EXPIRED.name());
		}

		return entity;
	}

}
