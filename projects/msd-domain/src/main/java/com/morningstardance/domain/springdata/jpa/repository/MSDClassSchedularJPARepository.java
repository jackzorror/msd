package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDClassSchedular;

public interface MSDClassSchedularJPARepository extends JpaRepository<MSDClassSchedular, Long> {
	List<MSDClassSchedular> findByMsdClassId(int msdClassId);

}
