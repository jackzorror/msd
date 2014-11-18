package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.morningstardance.domain.entity.MSDClass;

public interface MSDClassJPARepository extends JpaRepository<MSDClass, Long> {

	@Query("SELECT DISTINCT c.name FROM MSDClass c")
	public List<String> findUniqueNames();	

	public MSDClass findByName(String name);
	
	public List<MSDClass> findByIsActive (byte isActive);
	
	/*
	@Query("SELECT mc FROM MSDClass mc, MSDStudentClass msc WHERE mc.id = msc.msdClassid, msc.msdStudentId = :msdstudentid AND msc.isActive = 1 AND mc.isActive = 1")
	public List<MSDClass> findStudentRegisterClassByStudentId(@Param("msdstudentid") Integer msdStudentId);
	
	@Query("SELECT mc FROM MSDClass mc WHERE id not in (SELECT msdClassId FROM MSDStudentClass WHERE msdStudentId = :msdstudentid and isActive = 1) and isActive = 1")
	public List<MSDClass> findStudentNonRegisterClassByStudentId(@Param("msdstudentid") Integer msdStudentId);
	*/
}
