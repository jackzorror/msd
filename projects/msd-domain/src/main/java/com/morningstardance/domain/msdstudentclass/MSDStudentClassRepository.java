package com.morningstardance.domain.msdstudentclass;

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
	
	public int getAllStudentCount(Long msdclassid) {
		
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT COUNT(*) FROM msd_student_class c WHERE msd_class_id = :msdclassid");
		query.setParameter("msdclassid", msdclassid.intValue());
		Object result = query.getSingleResult();
		//int result = ((Integer)query.getSingleResult()).intValue();
		return ((Integer)result).intValue();
	}


}
