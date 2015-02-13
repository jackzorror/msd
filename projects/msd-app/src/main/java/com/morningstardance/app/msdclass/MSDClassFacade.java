package com.morningstardance.app.msdclass;

import java.util.List;

import com.morningstardance.domain.entity.MSDClass;

public interface MSDClassFacade {

	MSDClassDto getMSDClassById(Long msdclassId);

	List<MSDClassSummaryDto> getAllMSDClass();

	List<MSDClass> findAll();

	MSDClassDto saveClass(MSDClassDto msdclassdto);

	List<String> getClassUniqueName();

//	MSDClassDto getClassByClassName(String classname);
	
	MSDClassSummaryDto getMSDClassSummaryById(Long msdClassId);

	MSDClassDetailDto getMSDClassDetailById(Long msdClassId);

	List<MSDClassSummaryDto> getAllMSDClassByStatus(String classstatus);

	List<MSDClassSummaryDto> getAllMSDClassByStatusAndSemesterId(
			String classstatus, Long semesterid);

	List<MSDClassSummaryDto> getMSDClassByStatusAndSemesterIdAndTypeId(
			String classstatus, Long semesterid, Long typeid);

	MSDClassDto saveClass(MSDAddClassDto msdclassdto);

}
