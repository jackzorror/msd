package com.morningstardance.app.msdoperation;

import java.sql.Timestamp;
import java.util.Date;

import javax.annotation.Resource;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDOperation;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.springdata.jpa.repository.MSDOperationJPARepository;

@Service("msdOperationService")
public class MSDOperationService {
	
	@Resource
	private MSDOperationJPARepository msdOperationJPARepository;
	
	public void msdStudentRegisterUnregisterClassOperation(int sid, int cid, String operationDescription, String operationtype) {
	      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	      String name = auth.getName();
		
		Timestamp now = new Timestamp(new Date().getTime());
		
		MSDOperation msdoa = new MSDOperation();
		msdoa.setObjectId(sid);
		msdoa.setObjectType(MSDStudent.class.getSimpleName());
		msdoa.setUserName(name);
		msdoa.setOperationTime(now);
		msdoa.setOperationDescription(operationDescription);
		msdoa.setOperationType(operationtype);
		msdOperationJPARepository.save(msdoa);

		MSDOperation msdob = new MSDOperation();
		msdob.setObjectId(cid);
		msdob.setObjectType(MSDClass.class.getSimpleName());
		msdob.setUserName(name);
		msdob.setOperationTime(now);
		msdob.setOperationDescription(operationDescription);
		msdob.setOperationType(operationtype);
		msdOperationJPARepository.save(msdob);
	}

}
