package com.morningstardance.app.msdstudentfee;

import java.util.List;

import com.morningstardance.app.msdstudentfeepayment.MSDStudentFeePaymentDto;

public class MSDStudentFeeDetailDto extends MSDStudentFeeSummaryDto {

	private List<MSDStudentFeePaymentDto> msdStudentFeePaymentDtoList;

	public List<MSDStudentFeePaymentDto> getMsdStudentFeePaymentDtoList() {
		return msdStudentFeePaymentDtoList;
	}

	public void setMsdStudentFeePaymentDtoList(
			List<MSDStudentFeePaymentDto> msdStudentFeePaymentDtoList) {
		this.msdStudentFeePaymentDtoList = msdStudentFeePaymentDtoList;
	}
}
