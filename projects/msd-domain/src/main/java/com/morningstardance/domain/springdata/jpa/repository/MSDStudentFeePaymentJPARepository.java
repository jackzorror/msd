package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDStudentFeePayment;

public interface MSDStudentFeePaymentJPARepository extends
		JpaRepository<MSDStudentFeePayment, Long> {
	List<MSDStudentFeePayment> findByMsdStudentFeeId (int msdStudentFeeId);
	List<MSDStudentFeePayment> findByMsdStudentFeeIdOrderByPayTimeAsc (int msdStudentFeeId);
}
