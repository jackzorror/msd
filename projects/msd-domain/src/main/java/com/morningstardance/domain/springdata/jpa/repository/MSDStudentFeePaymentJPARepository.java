package com.morningstardance.domain.springdata.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDStudentFeePayment;

public interface MSDStudentFeePaymentJPARepository extends
		JpaRepository<MSDStudentFeePayment, Long> {

}
