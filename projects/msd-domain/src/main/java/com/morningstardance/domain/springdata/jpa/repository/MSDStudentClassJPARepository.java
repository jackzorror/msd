package com.morningstardance.domain.springdata.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDStudentClass;

public interface MSDStudentClassJPARepository extends JpaRepository<MSDStudentClass, Long> {
	
	public MSDStudentClass findByMsdClassIdAndMsdStudentId(int msdClassId, int msdStudentId);
	
}
