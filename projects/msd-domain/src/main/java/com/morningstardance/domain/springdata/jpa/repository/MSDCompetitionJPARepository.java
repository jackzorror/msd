package com.morningstardance.domain.springdata.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDCompetition;

public interface MSDCompetitionJPARepository extends JpaRepository<MSDCompetition, Long> {

	/*
	@Query("SELECT mc FROM MSDCompetition mc, MSDStudentCompetition msc  WHERE mc.id = msc.msdCompetitionId AND msc.msdStudentId = 1 AND msc.isActive = 1 AND mc.isActive = 1")
	public List<MSDCompetition> findStudentRegisterCompetitionByStudentId(@Param("msdstudentid") Integer msdStudentId);
	
	@Query("SELECT mc FROM MSDCompetition mc WHERE id not in (SELECT msdCompetitionId FROM MSDStudentCompetition WHERE msdStudentId = :msdstudentid and isActive = 1) and isActive = 1")
	public List<MSDCompetition> findStudentNonRegisterCompetitionByStudentId(@Param("msdstudentid") Integer msdStudentId);
	*/
}
