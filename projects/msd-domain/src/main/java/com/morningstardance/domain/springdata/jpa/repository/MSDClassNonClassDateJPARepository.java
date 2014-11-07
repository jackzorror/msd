package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDClassNonClassDate;

public interface MSDClassNonClassDateJPARepository extends JpaRepository<MSDClassNonClassDate, Long> {

	public List<MSDClassNonClassDate> findByMsdClassId(int msdClassId);
	
}
