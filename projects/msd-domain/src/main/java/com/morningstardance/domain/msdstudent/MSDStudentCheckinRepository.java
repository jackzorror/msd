package com.morningstardance.domain.msdstudent;

import org.springframework.stereotype.Repository;

import com.morningstardance.domain.base.repository.MSDBaseRepository;
import com.morningstardance.domain.entity.MsdStudentCheckin;

@Repository("msdStudentCheckinRepository")
public class MSDStudentCheckinRepository extends MSDBaseRepository<MsdStudentCheckin> {

	public MsdStudentCheckin findById(Long id) {
		return findById(MsdStudentCheckin.class, id);
	}


}
