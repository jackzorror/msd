package com.morningstardance.app.msdstudentfeepayment;

import java.util.List;

public interface MSDStudentFeePaymentFacade {

	List<MSDStudentFeePaymentDto> getStudentFeePaymentByStudentFeeId(
			Long studentfeeid);

}
