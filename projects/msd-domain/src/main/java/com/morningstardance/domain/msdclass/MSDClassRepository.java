package com.morningstardance.domain.msdclass;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.morningstardance.domain.base.repository.MSDBaseRepository;
import com.morningstardance.domain.entity.MSDClass;

@Repository("msdClassRepository")
public class MSDClassRepository extends MSDBaseRepository<MSDClass> {
	public MSDClass findById(Long id) {
		return findById(MSDClass.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<MSDClass> getAll() {
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT * From msd_class", 
				MSDClass.class);
		return (List<MSDClass>)query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<MSDClass> getStudentRegisterClassByStudentId(Long msdstudentid) {
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT mc.* FROM msd_class AS mc JOIN msd_student_class msc ON mc.id = msc.msd_class_id " +
				"WHERE msc.msd_student_id = :msdstudentid",
				MSDClass.class);
		query.setParameter("msdstudentid", msdstudentid);
		return (List<MSDClass>)query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<MSDClass> getStudentNonRegisterClassByStudentId(Long msdstudentid) {
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT * FROM msd_class WHERE id not in (SELECT msd_class_id FROM msd_student_class " +
				"WHERE msd_student_id = :msdstudentid)",
				MSDClass.class);
		query.setParameter("msdstudentid", msdstudentid);
		return (List<MSDClass>)query.getResultList();
	}
}
