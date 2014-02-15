package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentClass;

public interface MSDStudentJPARepository extends JpaRepository<MSDStudent, Long> {

	@Query("SELECT DISTINCT s.firstName FROM MSDStudent s")
	public List<String> findUniqueFirstNames();	

	@Query("SELECT DISTINCT s.lastName FROM MSDStudent s")
	public List<String> findUniqueLastNames();	
	
	public MSDStudent findByFirstNameAndLastName(String firstName, String lastName);

}
