package com.morningstardance.app.msdstudentcompetition;

public interface MSDStudentCompetitionFacade {

	MSDStudentCompetitionDto registerStudentToCompetitionByStudentCompetitionDto(
			MSDStudentCompetitionDto studentCompetitionDto);

	String registerStudentToCompetitionesByStudentIdAndCompetitionIdList(
			Long msdstudentid, String msdcompetitionidlist);

	String registerStudentToCompetitionByCompetitionIDAndStudentIdlistAndType(
			Long competitionid, String studentidlist, Long oldcompetitionid,
			String registertype);

	String unRegisterStudentFromCompetitionsByStudentIdAndCompetitionIdList(
			Long msdstudentid, String msdcompetitionidlist);

}
