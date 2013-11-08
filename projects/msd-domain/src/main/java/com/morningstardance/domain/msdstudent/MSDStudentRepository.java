package com.morningstardance.domain.msdstudent;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.morningstardance.domain.base.repository.MSDBaseRepository;
import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDStudent;

@Repository("msdStudentRepository")
public class MSDStudentRepository extends MSDBaseRepository<MSDStudent> {

	public MSDStudent findById(Long id) {
		return findById(MSDStudent.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<MSDStudent> getAll() {
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT * From msd_student", 
				MSDClass.class);
		return (List<MSDStudent>)query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<MSDStudent> getAllByClassId(Long msdClassId) {
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT * FROM msd_student AS s JOIN  msd_student_class AS sc ON s.id = sc.msd_student_id " +
				"WHERE sc.msd_class_id = :msdClassID ",
				MSDStudent.class);
		query.setParameter("msdClassID", msdClassId);
		return(List<MSDStudent>)query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<MSDStudent> getAllByClassIdForCheckin(Long msdClassId) {
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT s.* FROM msd_student AS s JOIN  msd_student_class AS sc ON s.id = sc.msd_student_id " +
				"WHERE sc.msd_class_id = :msdClassID " + 
				"and s.id not in ( " +
				"select msd_student_id from msd_student_checkin as sci where sci.msd_class_id = :msdClassID and " + 
				"sci.checkin_time > DATE_SUB(now(), INTERVAL 30 minute) )",
				MSDStudent.class);
		query.setParameter("msdClassID", msdClassId);
		return(List<MSDStudent>)query.getResultList();
	}
}
