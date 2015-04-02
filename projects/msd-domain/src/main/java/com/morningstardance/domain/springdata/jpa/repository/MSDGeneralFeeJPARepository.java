package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDGeneralFee;

public interface MSDGeneralFeeJPARepository extends JpaRepository<MSDGeneralFee, Long> {

	public List<MSDGeneralFee> findByName(String name);

}
