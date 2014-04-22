package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MsdUserRole;

public interface UserRoleJPARepository extends JpaRepository<MsdUserRole, Long> {
	
	public List<MsdUserRole> findByUserId(int userId);
}
