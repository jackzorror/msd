package com.morningstardance.app.msdclass;

import java.util.List;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDClassSchedular;

public interface MSDClassAssembler {
/*
	MSDClassSummaryDto createSummaryDtoFromEntity(MSDClass msdclass);

	List<MSDClassSummaryDto> createSummaryDtoFromEntity(List<MSDClass> msdclasses);
*/
	MSDClassSummaryDto createSummaryDtoFromEntity(MSDClass msdclass, List<MSDClassSchedular> msdclassschedulars);
	
	MSDClass createEntityFromDto(MSDClassDto msdclassdto);
	MSDClassDto createDtoFromEntity(MSDClass msdclass);

}
