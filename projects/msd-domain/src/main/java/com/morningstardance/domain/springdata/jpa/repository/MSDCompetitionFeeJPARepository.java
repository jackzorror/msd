package com.morningstardance.domain.springdata.jpa.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.morningstardance.domain.entity.MSDCompetitionFee;

public interface MSDCompetitionFeeJPARepository extends JpaRepository<MSDCompetitionFee, Long> {
	List<MSDCompetitionFee> findByMsdCompetitionId(int msdCompetitionId);

	List<MSDCompetitionFee> findByMsdCompetitionIdAndIsActive(int msdCompetitionId, byte isActive);

	@Query("SELECT SUM(cost) FROM MSDCompetitionFee c WHERE msdCompetitionId = :msdcompetitionid and isActive = :isactive")
	public BigDecimal getTotalCompetitionFeeByCompetitionIdAndIsActive(@Param("msdcompetitionid") Integer msdcompetitionid, @Param("isactive") byte isactive);

}
