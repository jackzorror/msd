package com.morningstardance.app.msdclassnonclassdate;

import java.util.List;

import com.morningstardance.domain.entity.MSDClassNonClassDate;

public interface MSDClassNonClassDateFacade {

	void deleteClassNonClassDateById(Long msdClassNonClassDateId);

	List<MSDClassNonClassDate> getClassNonClassDateByClassId(Long msdclassid);

	MSDClassNonClassDate addClassNonClassDate(MSDClassNonClassDate date);

}
