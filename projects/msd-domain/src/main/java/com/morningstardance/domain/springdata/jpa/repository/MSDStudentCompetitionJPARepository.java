package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.morningstardance.domain.entity.MSDStudentCompetition;

public interface MSDStudentCompetitionJPARepository extends JpaRepository<MSDStudentCompetition, Long> {

	public MSDStudentCompetition findByMsdCompetitionIdAndMsdStudentId(int msdCompetitionId, int msdStudentId);
	
	public List<MSDStudentCompetition> findByMsdStudentIdAndIsActive(int msdStudentId, byte isActive);
	
	public MSDStudentCompetition findByMsdCompetitionIdAndMsdStudentIdAndIsActive(int msdCompetitionId, int msdStudentId, byte isActive);

	public List<MSDStudentCompetition> findByMsdCompetitionId(int msdCompetitionId);
	
	public List<MSDStudentCompetition> findByMsdCompetitionIdAndIsActive(int msdCompetitionId, byte isActive);
	
	@Query("SELECT COUNT(*) FROM MSDStudentCompetition c WHERE msdCompetitionId = :msdcompetitionid and isActive = :isactive")
	public Long getTotalCountByCompetitionIdAndIsActive(@Param("msdcompetitionid") Integer msdCompetitionId, @Param("isactive") byte isactive);
}
