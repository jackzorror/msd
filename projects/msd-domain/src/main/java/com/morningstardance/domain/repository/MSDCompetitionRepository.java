package com.morningstardance.domain.repository;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.morningstardance.domain.base.repository.MSDBaseRepository;
import com.morningstardance.domain.entity.MSDCompetition;

@Repository("msdCompetitionRepository")
public class MSDCompetitionRepository extends MSDBaseRepository<MSDCompetition> {

	@SuppressWarnings("unchecked")
	public List<MSDCompetition> findStudentRegisterCompetitionByStudentId(Long msdstudentid) {
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT mc.* FROM msd_competition AS mc JOIN msd_student_competition msc ON mc.id = msc.msd_competition_id " +
				"WHERE msc.msd_student_id = :msdstudentid AND msc.is_active = 1 AND mc.is_active = 1",
				MSDCompetition.class);
		query.setParameter("msdstudentid", msdstudentid);
		return (List<MSDCompetition>)query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<MSDCompetition> findStudentNonRegisterCompetitionByStudentId(Long msdstudentid) {
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT * FROM msd_competition WHERE id not in (SELECT msd_competition_id FROM msd_student_competition " +
				"WHERE msd_student_id = :msdstudentid and is_active = 1) and is_active = 1",
				MSDCompetition.class);
		query.setParameter("msdstudentid", msdstudentid);
		return (List<MSDCompetition>)query.getResultList();
	}
}
