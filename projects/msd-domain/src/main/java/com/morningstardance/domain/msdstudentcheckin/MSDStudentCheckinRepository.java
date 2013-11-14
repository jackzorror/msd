package com.morningstardance.domain.msdstudentcheckin;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.morningstardance.domain.base.repository.MSDBaseRepository;
import com.morningstardance.domain.entity.MsdStudentCheckin;

@Repository("msdStudentCheckinRepository")
public class MSDStudentCheckinRepository extends MSDBaseRepository<MsdStudentCheckin> {

	public MsdStudentCheckin findById(Long id) {
		return findById(MsdStudentCheckin.class, id);
	}

	@SuppressWarnings("unchecked")
	public MsdStudentCheckin findForCheckInByStudentIdAndClassId(Long msdClassId,
			Long id) {
		Query query = this.getEntityManager().createNativeQuery(
			"select * from msd_student_checkin " + 
			"where msd_class_id = :msdclassid and msd_student_id = :msdstudentid " +
			"and checkin_time > DATE_SUB(now(), INTERVAL 60 minute)",
			MsdStudentCheckin.class);
		query.setParameter("msdclassid", msdClassId);
		query.setParameter("msdstudentid", id);
		List<MsdStudentCheckin> list = (List<MsdStudentCheckin>)query.getResultList();
		if (null != list && list.size() > 0) {
			return list.get(0);
		} else {
			return null;
		}
	}


}
