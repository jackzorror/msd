package com.morningstardance.domain.springdata.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.morningstardance.domain.entity.MSDStudentCredit;

public interface MSDStudentCreditJPARepository extends JpaRepository<MSDStudentCredit, Long> {

	List<MSDStudentCredit> findByMsdStudentIdAndIsActive(int msdStudentId, byte isActive);

	List<MSDStudentCredit> findByMsdStudentIdAndSemesterAndIsActive(int msdStudentId, int semester, byte isActive);
}
