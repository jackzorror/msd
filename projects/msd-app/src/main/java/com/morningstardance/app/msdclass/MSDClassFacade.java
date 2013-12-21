package com.morningstardance.app.msdclass;

import java.util.List;

import com.morningstardance.domain.entity.MSDClass;

public interface MSDClassFacade {

	MSDClassSummaryDto getMSDClassById(Long msdclassId);

	List<MSDClassSummaryDto> getAllMSDClass();

	List<MSDClass> findAll();

	MSDClassDto addClass(MSDClassDto msdclassdto);

	List<String> getClassUniqueName();

	MSDClassDto getClassByClassName(String classname);

}
