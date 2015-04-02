package com.morningstardance.app.msdstudentfeepayment;

import java.util.List;

import com.morningstardance.domain.entity.MSDStudentFeePayment;

public interface MSDStudentFeePaymentAssembler {

	List<MSDStudentFeePaymentDto> createDtosFromEntities(
			List<MSDStudentFeePayment> sfps);

	MSDStudentFeePaymentDto createDtoFromEntity(MSDStudentFeePayment entity);
}
