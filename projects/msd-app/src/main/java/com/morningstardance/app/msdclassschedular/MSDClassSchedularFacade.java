package com.morningstardance.app.msdclassschedular;

import java.util.List;

public interface MSDClassSchedularFacade {

	List<MSDClassSchedularDto> getClassSchedularByClassId(Long msdclassid);

	void addClassSchedularList(List<MSDClassSchedularDto> classSchedularDtos);

	void addClassSchedularList(int id, int msdClassId, String startTime,
			String endTime, String weekdays);

	MSDClassSchedularDto addClassSchedularList(MSDClassSchedularDto classSchedularDto);

	void addClassSchedularList(MSDClassSchedularDtos classSchedularDtos);

	void deleteClasSchedularById(Long msdClassSchedularId);

}
