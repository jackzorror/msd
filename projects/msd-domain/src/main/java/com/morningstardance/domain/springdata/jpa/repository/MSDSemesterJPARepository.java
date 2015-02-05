package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.morningstardance.domain.entity.MSDSemester;

public interface MSDSemesterJPARepository extends JpaRepository<MSDSemester, Long> {

	@Query("SELECT c FROM MSDSemester c ORDER BY startDate DESC")
	public List<MSDSemester> findAllOrderByStartDate();
}
