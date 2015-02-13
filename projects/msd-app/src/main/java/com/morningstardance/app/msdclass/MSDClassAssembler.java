package com.morningstardance.app.msdclass;

import java.math.BigDecimal;
import java.util.List;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDClassFee;
import com.morningstardance.domain.entity.MSDClassNonClassDate;
import com.morningstardance.domain.entity.MSDClassSchedular;

public interface MSDClassAssembler {
/*
	MSDClassSummaryDto createSummaryDtoFromEntity(MSDClass msdclass);

	List<MSDClassSummaryDto> createSummaryDtoFromEntity(List<MSDClass> msdclasses);
*/
	MSDClassSummaryDto createSummaryDtoFromEntity(MSDClass msdclass, List<MSDClassSchedular> msdclassschedulars);
	
	MSDClass createEntityFromDto(MSDClassDto msdclassdto);
	MSDClassDto createDtoFromEntity(MSDClass msdclass);

	MSDClassDetailDto createClassDetailFromEntity(MSDClass msdclass,
			List<MSDClassSchedular> msdclassschedulars, List<MSDClassFee> msdclassfees, List<MSDClassNonClassDate> msdnonclassdates, Long totalStudentCount, BigDecimal totalClassFee, int totalClassCount);

	MSDClass createEntityFromDto(MSDAddClassDto msdclassdto);

}
