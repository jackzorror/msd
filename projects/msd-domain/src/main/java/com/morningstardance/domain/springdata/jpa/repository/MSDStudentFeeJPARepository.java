package com.morningstardance.domain.springdata.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDStudentFee;

public interface MSDStudentFeeJPARepository extends JpaRepository<MSDStudentFee, Long> {
	MSDStudentFee findByMsdStudentIdAndMsdStudentFeeObjectIdAndMsdStudentFeeObjectName(int msdStudentId, int msdStudentFeeObjectId, String msdStudentFeeObjectName);
}
