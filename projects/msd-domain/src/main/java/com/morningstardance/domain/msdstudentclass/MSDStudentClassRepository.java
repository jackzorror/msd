package com.morningstardance.domain.msdstudentclass;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.morningstardance.domain.base.repository.MSDBaseRepository;
import com.morningstardance.domain.entity.MSDStudentClass;

@Repository("msdStudentClassRepository")
public class MSDStudentClassRepository extends MSDBaseRepository<MSDStudentClass> {

	public MSDStudentClass findById(Long id) {
		return findById(MSDStudentClass.class, id);
	}

	@SuppressWarnings("unchecked")
	public MSDStudentClass findAllRegisterClassByStudentId(Long msdStudentId) {
		
		return null;
	}


}
