package com.morningstardance.app.msdstudentfee;

public interface MSDStudentFeeFacade {

	void addClassFeeToStudentFeeByStudentIdAndStudentClassId(Long sid, Long cid);

	void addCompetitionFeeToStudentFeeByStudentIdAndStudentCompetitionId(Long msdStudentId, Long id);

	void removeClassFeeFromStudentFeeByStudentIdAndStudentClassId(Long sid, Long cid);

	void removeCompetitionFeeFromStudentFeeByStudentIdAndStudentCompetitionId(Long msdtudentid, Long scid);

	void removeClassFeeFromStudentFeeByClassFeeId(Long msdClassFeeId);

	void removeCompetitionFeeFromStudentFeeByCompetitionFeeId(Long msdCompetitionFeeId);

	void addClassFeeToStudentFeeByClassFeeId(Long msdClassFeeId);
	
	void addCompetitionFeeToStudentFeeByCompetitionFeeId(Long msdCompetitionFeeId);
}
