package com.morningstardance.domain.repository;

import java.math.BigInteger;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.morningstardance.domain.base.repository.MSDBaseRepository;
import com.morningstardance.domain.entity.MSDStudentFee;

@Repository("msdStudentFeeRepository")
public class MSDStudentFeeRepository extends MSDBaseRepository<MSDStudentFee> {

	public int getActiveGeneralClassFeeCountByStudentIdAndSemesterId(int msdstudentid, int semesterid) {
		
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT count(*) FROM msd_student_fee AS msf " + 
				"JOIN msd_general_fee AS mgf ON msf.msd_student_fee_object_id = mgf.id " + 
				"JOIN msd_type AS mt ON mt.id = mgf.fee_type_id " +
				"WHERE msf.msd_student_fee_object_name = 'MSDGeneralFee' " +
				"AND mt.name = 'General Class Fee' AND mt.type = 'FEE_TYPE' AND msf.is_active = 1 " +
				"AND msf.msd_student_id = :msdstudentid AND msf.semester = :semesterid");
		query.setParameter("msdstudentid", msdstudentid);
		query.setParameter("semesterid", semesterid);
		Object result = query.getSingleResult();
		return ((BigInteger)result).intValue();
	}
}
