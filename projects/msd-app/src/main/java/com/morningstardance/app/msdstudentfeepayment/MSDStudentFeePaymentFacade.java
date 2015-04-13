package com.morningstardance.app.msdstudentfeepayment;

import java.util.List;

import com.morningstardance.domain.entity.MSDStudentFee;

public interface MSDStudentFeePaymentFacade {

	List<MSDStudentFeePaymentDto> getStudentFeePaymentByStudentFeeId(
			Long studentfeeid);

	MSDStudentFeePaymentDto addStudentFeePaymentByDto(
			MSDStudentFeePaymentDto msdStudentFeePaymentDto);

	void createStudentFeePaymentAfterUpdateStudentFeeForGeneralClassFee(
			MSDStudentFee sf);

	List<MSDStudentFeePaymentDto> getStudentFeePaymentsByStudentIdAndSemesterId(
			Long studentid, Long semesterid);

	String updateStudentFeePayment(
			MSDStudentFeePaymentDto msdStudentFeePaymentDtos);

	String updateStudentFeePayment(String dtos);

}
