package com.morningstardance.domain.springdata.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MsdUser;

public interface UserJPARepository extends JpaRepository<MsdUser, Long> {

	public MsdUser findByUsername(String username);
}
