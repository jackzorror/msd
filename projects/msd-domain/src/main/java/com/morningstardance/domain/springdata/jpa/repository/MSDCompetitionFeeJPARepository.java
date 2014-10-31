package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDCompetitionFee;

public interface MSDCompetitionFeeJPARepository extends JpaRepository<MSDCompetitionFee, Long> {
	List<MSDCompetitionFee> findByMsdCompetitionId(int msdCompetitionId);

	List<MSDCompetitionFee> findByMsdCompetitionIdAndIsActive(int msdCompetitionId, byte isActive);
}
