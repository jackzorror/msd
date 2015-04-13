package com.morningstardance.app.msdclassfee;

import java.util.List;

public interface MSDClassFeeFacade {

	MSDClassFeeDto getClassFeeById(Long msdclassfeeid);

	List<MSDClassFeeDto> getClassFeeByClassId(Long msdclassid);

	void addClassFee(Long id, Long intValue, String name, Long msdCostTypeId,
			float cost);

	void addClassFee(Long id, Long msdClassId, String name, Long msdCostTypeId,
			float cost, float oneTimePay, float monthlyPay, float weeklyPay,
			float dailyPay, float timesPay);

	void deleteClassFeeById(Long msdClassFeeId);

}
