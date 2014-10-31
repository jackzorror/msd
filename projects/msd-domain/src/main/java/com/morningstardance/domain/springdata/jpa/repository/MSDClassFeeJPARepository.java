package com.morningstardance.domain.springdata.jpa.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.morningstardance.domain.entity.MSDClassFee;

public interface MSDClassFeeJPARepository extends JpaRepository<MSDClassFee, Long> {
	List<MSDClassFee> findByMsdClassId(int msdClassId);

	List<MSDClassFee> findByMsdClassIdAndIsActive(int msdClassId, byte isActive);
	
	@Query("SELECT SUM(cost) FROM MSDClassFee c WHERE msdClassId = :msdclassid and isActive = :isactive")
	public BigDecimal getTotalClassFeeByClassIdAndIsActive(@Param("msdclassid") Integer msdclassid, @Param("isactive") byte isactive);
}
