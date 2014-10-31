package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.morningstardance.domain.entity.MSDStudentClass;

public interface MSDStudentClassJPARepository extends JpaRepository<MSDStudentClass, Long> {
	
	public MSDStudentClass findByMsdClassIdAndMsdStudentId(int msdClassId, int msdStudentId);
	
	public List<MSDStudentClass> findByMsdStudentIdAndIsActive(int msdStudentId, byte isActive);
	
	public MSDStudentClass findByMsdClassIdAndMsdStudentIdAndIsActive(int msdClassId, int msdStudentId, byte isActive);

	public List<MSDStudentClass> findByMsdClassId(int msdClassId);
	
	public List<MSDStudentClass> findByMsdClassIdAndIsActive(int msdClassId, byte isActive);
	
	@Query("SELECT COUNT(*) FROM MSDStudentClass c WHERE msdClassId = :msdclassid and isActive = :isactive")
	public Long getTotalCountByClassIdAndIsActive(@Param("msdclassid") Integer msdclassid, @Param("isactive") byte isactive);
}
