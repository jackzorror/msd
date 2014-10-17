package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDClassFee;

public interface MSDClassFeeJPARepository extends JpaRepository<MSDClassFee, Long> {
	List<MSDClassFee> findByMsdClassId(int msdClassId);

	List<MSDClassFee> findByMsdClassIdAndIsActive(int msdClassId, byte isActive);
}
