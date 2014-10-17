package com.morningstardance.app.msdclassschedular;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.app.util.WeekdayEnum;
import com.morningstardance.domain.entity.MSDClassSchedular;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassSchedularJPARepository;

@Service("msdClassSchedularFacade")
public class MSDClassSchedularFacadeImpl implements MSDClassSchedularFacade {
	
	@Resource
	private MSDClassSchedularJPARepository msdClassSchedularJPARepository;
	
	@Resource
	private MSDClassSchedularAssembler msdClassSchedularAssembler;
	
	@Resource
	private MSDOperationService msdOperationService;

	@Override
	public List<MSDClassSchedularDto> getClassSchedularByClassId(Long msdclassid) {
		List<MSDClassSchedular> css = msdClassSchedularJPARepository.findByMsdClassId(msdclassid.intValue());
		List<MSDClassSchedularDto>  dtos = msdClassSchedularAssembler.createDtoFromEntity(css);
		return dtos;
	}

	@Override
	public void addClassSchedularList(List<MSDClassSchedularDto> classSchedularDtos) {
		for (MSDClassSchedularDto dto : classSchedularDtos) {
			MSDClassSchedular entity = msdClassSchedularAssembler.createEntityFromDto(dto);
			msdClassSchedularJPARepository.save(entity);
			msdOperationService.msdClassOperation(new Long(entity.getMsdClassId()), "Add Class Schedular", entity.toString(), null, "DATABASE");
		}
	}

	@Override
	public void addClassSchedularList(int id, int msdClassId, String startTime,
			String endTime, String weekday) {
			MSDClassSchedular entity = new MSDClassSchedular();
			entity.setId(new Long(id));
			entity.setMsdClassId(msdClassId);
			entity.setStartTime(startTime);
			entity.setEndTime(endTime);
			entity.setWeekday(WeekdayEnum.valueOf(weekday).getValue());
			msdClassSchedularJPARepository.save(entity);
			msdOperationService.msdClassOperation(new Long(msdClassId), "Add Class Schedular", entity.toString(), null, "DATABASE");
	}

	@Override
	public MSDClassSchedularDto addClassSchedularList(MSDClassSchedularDto classSchedularDto) {
		MSDClassSchedular entity = msdClassSchedularAssembler.createEntityFromDto(classSchedularDto);
		msdClassSchedularJPARepository.save(entity);
		msdOperationService.msdClassOperation(new Long(classSchedularDto.getMsdClassId()), "Add Class Schedular", entity.toString(), null, "DATABASE");
		MSDClassSchedularDto dto = msdClassSchedularAssembler.createDtoFromEntity(entity);
		return dto;
	}

	@Override
	public void addClassSchedularList(MSDClassSchedularDtos classSchedularDtos) {
		for (String weekday : classSchedularDtos.getWeekdays()) {
			MSDClassSchedular entity = new MSDClassSchedular();
			entity.setMsdClassId(classSchedularDtos.getMsdClassId());
			entity.setStartTime(classSchedularDtos.getStartTime());
			entity.setEndTime(classSchedularDtos.getEndTime());
			entity.setWeekday(WeekdayEnum.valueOf(weekday).getValue());
			msdClassSchedularJPARepository.save(entity);
			msdOperationService.msdClassOperation(new Long(classSchedularDtos.getMsdClassId()), "Add Class Schedular", entity.toString(), null, "DATABASE");
			
		}
		
	}

	@Override
	public void deleteClasSchedularByIdList(Long [] msdClassSchedularIds) {
		for (Long id : msdClassSchedularIds) {
			MSDClassSchedular entity = msdClassSchedularJPARepository.findOne(id);
			if (null != entity) {
				msdClassSchedularJPARepository.delete(id);
				msdOperationService.msdClassOperation(new Long(entity.getMsdClassId()), "Delete Class Schedular", null, entity.toString(), "DATABASE");
			}
		}
	}

	@Override
	public void deleteClasSchedularById(Long msdClassSchedularId) {
		MSDClassSchedular entity = msdClassSchedularJPARepository.findOne(msdClassSchedularId);
		if (null != entity) {
			msdClassSchedularJPARepository.delete(msdClassSchedularId);
			msdOperationService.msdClassOperation(new Long(entity.getMsdClassId()), "Delete Class Schedular", null, entity.toString(), "DATABASE");
		}
	}
}
