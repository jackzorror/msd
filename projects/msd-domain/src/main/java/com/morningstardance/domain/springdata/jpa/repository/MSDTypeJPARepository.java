package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDType;

public interface MSDTypeJPARepository extends JpaRepository<MSDType, Long> {

	public List<MSDType> findByType(String type);

	public List<MSDType> findByName(String name);

}
