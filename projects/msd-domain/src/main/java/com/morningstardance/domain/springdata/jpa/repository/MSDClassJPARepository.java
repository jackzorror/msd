package com.morningstardance.domain.springdata.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDClass;

public interface MSDClassJPARepository extends JpaRepository<MSDClass, Long> {
}
