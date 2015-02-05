package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDStudentFee;

public interface MSDStudentFeeJPARepository extends JpaRepository<MSDStudentFee, Long> {
	List<MSDStudentFee> findByMsdStudentIdAndMsdStudentFeeObjectIdAndMsdStudentFeeObjectName
		(int msdStudentId, int msdStudentFeeObjectId, String msdStudentFeeObjectName);

	List<MSDStudentFee> findByMsdStudentIdAndMsdStudentFeeObjectIdAndMsdStudentFeeObjectNameAndIsActive
		(int msdStudentId, int msdStudentFeeObjectId, String msdStudentFeeObjectName, byte isActive);

	List<MSDStudentFee> findByMsdStudentFeeObjectIdAndMsdStudentFeeObjectNameAndIsActive
		(int msdStudentFeeObjectId, String msdStudentFeeObjectName, byte isActive);
	
	List<MSDStudentFee> findByMsdStudentId(int msdStudentId);
	
	List<MSDStudentFee> findByMsdStudentIdAndIsActive(int msdStudentId, byte isActive);

	List<MSDStudentFee> findByMsdStudentIdAndSemesterAndIsActive(int msdStudentId, int semester, byte isActive);
}
