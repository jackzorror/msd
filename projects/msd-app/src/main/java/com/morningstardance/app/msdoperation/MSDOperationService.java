package com.morningstardance.app.msdoperation;

import java.sql.Timestamp;
import java.util.Date;

import javax.annotation.Resource;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDCompetition;
import com.morningstardance.domain.entity.MSDOperation;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.springdata.jpa.repository.MSDOperationJPARepository;

@Service("msdOperationService")
public class MSDOperationService {
	
	@Resource
	private MSDOperationJPARepository msdOperationJPARepository;
	
	public void msdStudentClassOperation(Long sid, Long cid, String operationDescription, String operationtype) {
		msdClassOperation(cid, operationDescription, null, null, operationtype);
		msdStudentOperation(sid, operationDescription, null, null, operationtype);
	}
	
	public void msdStudentCompetitionOperation(Long sid, Long cid, String operationDescription, String operationtype) {
		msdCompetitionOperation(cid, operationDescription, null, null, operationtype);
		msdStudentOperation(sid, operationDescription, null, null, operationtype);
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

	public void msdClassOperation(Long cid, String operationDescription, String nvalue, String ovalue, String operationtype) {
		msdEntityOperation(cid, operationDescription, nvalue, ovalue, MSDClass.class.getSimpleName(), operationtype);
	}
	
	public void msdStudentOperation(Long sid, String operationDescription, String nvalue, String ovalue, String operationtype) {
		msdEntityOperation(sid, operationDescription, nvalue, ovalue, MSDStudent.class.getSimpleName(), operationtype);
	}
	
	public void msdCompetitionOperation(Long cid, String operationDescription, String nvalue, String ovalue, String operationtype) {
		msdEntityOperation(cid, operationDescription, nvalue, ovalue, MSDCompetition.class.getSimpleName(), operationtype);
	}
	
	private void msdEntityOperation(Long cid, String operationDescription, String nvalue, String ovalue, String objectType, String operationtype) {
	    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    String name = auth.getName();
		
		Timestamp now = new Timestamp(new Date().getTime());
		
		MSDOperation msdo = new MSDOperation();
		msdo.setObjectId(cid.intValue());
		msdo.setObjectType(objectType);
		msdo.setUserName(name);
		msdo.setOperationTime(now);
		msdo.setOperationDescription(operationDescription);
		msdo.setOperationType(operationtype);
		msdo.setNewValue(nvalue);
		msdo.setOldValue(ovalue);
		msdOperationJPARepository.save(msdo);

	}
}
