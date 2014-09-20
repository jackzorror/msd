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
	
	public void msdStudentRegisterUnregisterClassOperation(Long sid, Long cid, String operationDescription, String operationtype) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    String name = auth.getName();
		
		Timestamp now = new Timestamp(new Date().getTime());
		
		MSDOperation msdoa = new MSDOperation();
		msdoa.setObjectId(sid.intValue());
		msdoa.setObjectType(MSDStudent.class.getSimpleName());
		msdoa.setUserName(name);
		msdoa.setOperationTime(now);
		msdoa.setOperationDescription(operationDescription);
		msdoa.setOperationType(operationtype);
		msdOperationJPARepository.save(msdoa);

		MSDOperation msdob = new MSDOperation();
		msdob.setObjectId(cid.intValue());
		msdob.setObjectType(MSDClass.class.getSimpleName());
		msdob.setUserName(name);
		msdob.setOperationTime(now);
		msdob.setOperationDescription(operationDescription);
		msdob.setOperationType(operationtype);
		msdOperationJPARepository.save(msdob);
	}

	public void msdUserLoginSuccessfully(String username) {
		Timestamp now = new Timestamp(new Date().getTime());
		
		MSDOperation msdo = new MSDOperation();
		msdo.setObjectId(9999);
		msdo.setObjectType("LOGIN");
		msdo.setUserName(username);
		msdo.setOperationTime(now);
		msdo.setOperationDescription("User successfully login system");
		msdo.setOperationType("SUCCESS");
		msdOperationJPARepository.save(msdo);
	}

	public void msdUserLoginFalure(String username, String password) {
		Timestamp now = new Timestamp(new Date().getTime());
		
		MSDOperation msdo = new MSDOperation();
		msdo.setObjectId(9999);
		msdo.setObjectType("LOGIN");
		msdo.setUserName(username);
		msdo.setOperationTime(now);
		msdo.setOperationDescription("User falure login system username: " + username + " pw: " + password);
		msdo.setOperationType("FALURE");
		msdOperationJPARepository.save(msdo);
	}

	public void msdUserLoginError(String username, String password, String message) {
		Timestamp now = new Timestamp(new Date().getTime());
		
		MSDOperation msdo = new MSDOperation();
		msdo.setObjectId(9999);
		msdo.setObjectType("LOGIN");
		msdo.setUserName(username);
		msdo.setOperationTime(now);
		msdo.setOperationDescription("Error login. username: " + username + " pw: " + password + " : " + message);
		msdo.setOperationType("ERROR");
		msdOperationJPARepository.save(msdo);
	}

	public void msdUserLogout(String name) {
		Timestamp now = new Timestamp(new Date().getTime());

		MSDOperation msdo = new MSDOperation();
		msdo.setObjectId(9999);
		msdo.setObjectType("LOGIN");
		msdo.setUserName(name);
		msdo.setOperationTime(now);
		msdo.setOperationDescription("User logout system");
		msdo.setOperationType("LOGOUT");
		msdOperationJPARepository.save(msdo);
	}

}
