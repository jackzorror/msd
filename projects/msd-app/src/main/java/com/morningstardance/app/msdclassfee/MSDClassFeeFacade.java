package com.morningstardance.app.msdclassfee;

import java.util.List;

public interface MSDClassFeeFacade {

	MSDClassFeeDto getClasFeeById(Long msdclassfeeid);

	List<MSDClassFeeDto> getClassFeeByClassId(Long msdclassid);

	void addClassFee(Long id, Long intValue, String name, Long msdCostTypeId,
			float cost);

	void deleteClassFeeById(Long msdClassFeeId);

}
