package com.morningstardance.app.msdclassschedular;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.util.WeekdayEnum;
import com.morningstardance.domain.entity.MSDClassSchedular;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassSchedularJPARepository;

@Service("msdClassSchedularFacade")
public class MSDClassSchedularFacadeImpl implements MSDClassSchedularFacade {
	
	@Resource
	private MSDClassSchedularJPARepository msdClassSchedularJPARepository;
	
	@Resource
	private MSDClassSchedularAssembler msdClassSchedularAssembler;

	@Override
	public List<MSDClassSchedularDto> getClassSchedularByClassId(Long msdclassid) {
		List<MSDClassSchedular> css = msdClassSchedularJPARepository.findByMsdClassId(msdclassid.intValue());
		List<MSDClassSchedularDto>  dtos = msdClassSchedularAssembler.createDtoFromEntity(css);
		return dtos;
	}

	@Override
	// this function doesn't work!!!
	public void addClassSchedularList(List<MSDClassSchedularDto> classSchedularDtos) {
		for (MSDClassSchedularDto dto : classSchedularDtos) {
			MSDClassSchedular entity = msdClassSchedularAssembler.createEntityFromDto(dto);
			msdClassSchedularJPARepository.save(entity);
		}
	}

	@Override
	public void addClassSchedularList(int id, int msdClassId, String startTime,
			String endTime, String weekdays) {
//		for (String wd : weekdays) {
			MSDClassSchedular entity = new MSDClassSchedular();
			entity.setId(new Long(id));
			entity.setMsdClassId(msdClassId);
			entity.setStartTime(startTime);
			entity.setEndTime(endTime);
			entity.setWeekday(WeekdayEnum.valueOf("SUN").getValue());
			msdClassSchedularJPARepository.save(entity);
		//}
	}

	@Override
	public MSDClassSchedularDto addClassSchedularList(MSDClassSchedularDto classSchedularDto) {
		MSDClassSchedular entity = msdClassSchedularAssembler.createEntityFromDto(classSchedularDto);
		msdClassSchedularJPARepository.save(entity);
		MSDClassSchedularDto dto = msdClassSchedularAssembler.createDtoFromEntity(entity);
		return dto;
	}

	@Override
	public void addClassSchedularList(MSDClassSchedularDtos classSchedularDtos) {
		for (String weekday : classSchedularDtos.getWeekdays()) {
			MSDClassSchedular entity = new MSDClassSchedular();
			entity.setId(new Long(classSchedularDtos.getId()));
			entity.setMsdClassId(classSchedularDtos.getMsdClassId());
			entity.setStartTime(classSchedularDtos.getStartTime());
			entity.setEndTime(classSchedularDtos.getEndTime());
			entity.setWeekday(WeekdayEnum.valueOf(weekday).getValue());
			msdClassSchedularJPARepository.save(entity);
		}
		
	}

	@Override
	public void deleteClasSchedularById(Long msdClassSchedularId) {
		msdClassSchedularJPARepository.delete(msdClassSchedularId);
	}
}
