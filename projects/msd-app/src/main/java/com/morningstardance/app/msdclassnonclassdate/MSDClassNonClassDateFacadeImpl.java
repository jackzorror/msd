package com.morningstardance.app.msdclassnonclassdate;

import java.text.SimpleDateFormat;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDClassNonClassDate;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassNonClassDateJPARepository;

@Service("msdClassNonClassDateFacade")
public class MSDClassNonClassDateFacadeImpl implements MSDClassNonClassDateFacade {
	
	@Resource
	MSDClassNonClassDateJPARepository msdClassNonClassDateJPARepository;
	
	@Resource
	MSDClassJPARepository msdClassJPARepository;
	
	@Resource
	MSDOperationService msdOperationService;

	@Override
	public void deleteClassNonClassDateById(Long msdClassNonClassDateId) {
		if (null == msdClassNonClassDateId || msdClassNonClassDateId.intValue() == 0) return;
		MSDClassNonClassDate entity = msdClassNonClassDateJPARepository.findOne(msdClassNonClassDateId);
		
		if (null == entity) return;
		
		msdClassNonClassDateJPARepository.delete(msdClassNonClassDateId);
		msdOperationService.msdClassOperation(new Long(entity.getMsdClassId()), "Delete non Class Date", null, entity.toString(), "DATABASE");
		
	}

	@Override
	public List<MSDClassNonClassDate> getClassNonClassDateByClassId(Long msdclassid) {
		if (null == msdclassid || msdclassid.intValue() == 0) return null;
		
		List<MSDClassNonClassDate> cncs = msdClassNonClassDateJPARepository.findByMsdClassId(msdclassid.intValue());
		
		return cncs;
	}

	@Override
	public MSDClassNonClassDate addClassNonClassDate(MSDClassNonClassDate date) {
		if (null == date || 0 == date.getMsdClassId() || null == date.getNonClassDate()) return null;
		
		MSDClass cEntity = msdClassJPARepository.findOne(new Long(date.getMsdClassId()));
		if (null == cEntity) return null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyymmdd");
		String dateStr = sdf.format(date.getNonClassDate());
		
		List<MSDClassNonClassDate> dates = msdClassNonClassDateJPARepository.findByMsdClassId(date.getMsdClassId());
		for (MSDClassNonClassDate d : dates) {
			String dstr = sdf.format(d.getNonClassDate());
			if (dstr.equals(dateStr))
				return d;
		}
		
		msdClassNonClassDateJPARepository.save(date);
		
		return date;
	}

}
