package com.morningstardance.app.msdstudentfee;

public interface MSDStudentFeeFacade {

	void addClassFeeToStudentFeeByStudentIdAndStudentClassId(Long sid, Long cid);

	void removeClassFeeFromStudentFeeByStudentIdAndStudentClassId(Long sid, Long cid);

}
