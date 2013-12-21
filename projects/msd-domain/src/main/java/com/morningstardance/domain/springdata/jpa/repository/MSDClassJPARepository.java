package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.morningstardance.domain.entity.MSDClass;

public interface MSDClassJPARepository extends JpaRepository<MSDClass, Long> {

	@Query("SELECT DISTINCT c.name FROM MSDClass c")
	public List<String> findUniqueNames();	

	public MSDClass findByName(String name);
}
