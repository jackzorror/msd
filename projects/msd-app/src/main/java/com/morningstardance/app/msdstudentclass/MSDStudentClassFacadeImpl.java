package com.morningstardance.app.msdstudentclass;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdoperation.MSDOperationService;
import com.morningstardance.app.msdstudentfee.MSDStudentFeeFacade;
import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentClass;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentClassJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentJPARepository;

@Service("msdStudentClassFacade")
public class MSDStudentClassFacadeImpl implements MSDStudentClassFacade {

	@Resource
	private MSDStudentClassJPARepository msdStudentClassJPARepository;
	
	@Resource
	private MSDClassJPARepository msdClassJPARepository;
	
	@Resource
	private MSDStudentJPARepository msdStudentJPARepository;
	
	@Resource
	private MSDOperationService msdOperationService;
	
	@Resource
	private MSDStudentFeeFacade msdStudentFeeFacade;
	
	@Override
	public MSDStudentClassDto registerStudentToClassByStudentClassDto(MSDStudentClassDto studentClassDto) {
		if (null == studentClassDto) return null;
		
		return registerStudentToClassByStudentIdAndClassId(new Long(studentClassDto.getMsdStudentId()), new Long(studentClassDto.getMsdClassId()));
	}
	
	public MSDStudentClassDto registerStudentToClassByStudentIdAndClassId(Long sid, Long cid) {
		if (null == sid || null == cid) return null;
		
		MSDStudentClass entity = registerStudentToClassByStudentIdClassId(sid, cid);
		
		MSDStudentClassDto dto = new MSDStudentClassDto();
		dto.setId(entity.getId().intValue());
		dto.setMsdClassId(entity.getMsdClassId());
		dto.setMsdStudentId(entity.getMsdStudentId());
		return dto;
	}

	/**
	 * when user un register a student from class, it also de active all class fee
	 * from student fee 
	 * @param id
	 * 
	 * 2015/01/06 remove class fee from system
	 */
	private void unRegisterStudentFromClassById(Long id) {
		if (null == id) return;
		
		MSDStudentClass msdsc = msdStudentClassJPARepository.findOne(id);
		if (null != msdsc) {
			msdsc.setIsActive((byte)0);
			msdStudentClassJPARepository.saveAndFlush(msdsc);
			Long sid = new Long(msdsc.getMsdStudentId());
			Long cid = new Long(msdsc.getMsdClassId());
			msdOperationService.msdStudentClassOperation(sid, cid, "Un Register Student : " + sid + " from Class : " + cid, "DATABASE");
		}
	}

	@Override
	public String registerStudentToClassesByStudentIdAndClassIdList(Long msdstudentid, String msdclassidlist) {
		if (null == msdstudentid || msdstudentid.intValue() == 0 || null == msdclassidlist || msdclassidlist.isEmpty()) return null;
		String [] ids = msdclassidlist.split(",");
		for (String id : ids) {
			if (null != id && !(id.isEmpty()))
				registerStudentToClassByStudentIdAndClassId(msdstudentid, new Long(id));
		}
		
		return "Sucess";
	}
	
	/**
	 * when user register student to class, it also add all acitve class fee to
	 * student fee
	 * @param sid
	 * @param cid
	 * @return
	 * 
	 * 2015/01/06 remove class fee from system
	 */
	private MSDStudentClass registerStudentToClassByStudentIdClassId(Long sid, Long cid) {
		if (null == sid || null == cid) return null;
		
		MSDStudentClass studentClass = new MSDStudentClass();
		studentClass.setMsdClassId(cid.intValue());
		studentClass.setMsdStudentId(sid.intValue());
		studentClass.setIsActive((byte)1);
		MSDStudentClass entity = null;
		entity = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentIdAndIsActive(cid.intValue(), sid.intValue(), (byte) 1);
		if (null == entity) {
			entity = msdStudentClassJPARepository.save(studentClass);
			msdOperationService.msdStudentClassOperation(sid, cid, "Register Student : " + sid + " to Class : " + cid, "DATABASE");
		} else {
			String msg = "Student already register to this Class";
			msdOperationService.msdStudentClassOperation(sid, cid, "Register Student : " + sid + " to Class : " + cid + " reason : " + msg +
					Thread.currentThread().getStackTrace()[1].getMethodName() + " at line : " + Thread.currentThread().getStackTrace()[1].getLineNumber(), "WARNING");
		}
		return entity;
	}

	@Override
	public String unRegisterStudentFromClassesByStudentIdAndClassIdList(Long msdstudentid, String msdclassidlist) {
		if (null == msdstudentid || msdstudentid.intValue() == 0 || null == msdclassidlist || msdclassidlist.isEmpty()) return null;
		String [] ids = msdclassidlist.split(",");
		for (String id : ids) {
			if (null != id && !(id.isEmpty()))
				unRegisterStudentFromClassByStudentIdAndClassId(msdstudentid, new Long(id));
		}
		
		return "Sucess";
	}

	public String unRegisterStudentFromClassByStudentIdAndClassId(Long sid, Long cid) {
		if (null == sid || null == cid) return null;
		
		MSDStudentClass entity = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentIdAndIsActive(cid.intValue(), sid.intValue(),(byte) 1);
		if (null != entity) {
			unRegisterStudentFromClassById(entity.getId());
		} else {
			String msg = "Cannot find student register record.";
			msdOperationService.msdStudentClassOperation(sid, cid, "Un - Register Student : " + sid + " from Class : " + cid + " " + " reason: " + msg + 
					Thread.currentThread().getStackTrace()[1].getMethodName() + " at line : " + Thread.currentThread().getStackTrace()[1].getLineNumber(), "WARNING");
		}
		
		return "success";
		
	}

	@Override
	public String registerStudentToClassByClassIDAndStudentIdlistAndType(Long classid, String studentidlist, Long oldclassid, String registertype) {
		if (null == registertype || registertype.isEmpty() || null == studentidlist || studentidlist.isEmpty()) return null;
		
		if (registertype.equals("REGISTER") && (null == classid || classid == 0)) return null;
		
		if ((registertype.equals("UPGREATE") || registertype.equals("REMOVE")) && (null == classid || classid == 0)) return null;
		
		if (registertype.equals("REMOVE")) {
			MSDClass oldmsdclass = msdClassJPARepository.findOne(classid);
			if (oldmsdclass == null) return null;

			String sids[] = studentidlist.split(",");
			for (String id : sids) {
				MSDStudent student = msdStudentJPARepository.findOne(new Long(id));
				if (null != student)
					unRegisterStudentFromClassByStudentIdAndClassId(student.getId(), classid);
			}

			return "Sucess";

		}
		
		MSDClass msdclass = msdClassJPARepository.findOne(classid);
		if (null == msdclass) return null;
		
		MSDClass oldmsdclass = null;
		
		if (registertype != null && registertype.equals("UPGREATE") && oldclassid != null && oldclassid != 0) {
			oldmsdclass = msdClassJPARepository.findOne(oldclassid);
			if (oldmsdclass == null) return null;
		}
		
		String sids[] = studentidlist.split(",");
		for (String id : sids) {
			MSDStudent student = msdStudentJPARepository.findOne(new Long(id));
			if (null != student) {
				registerStudentToClassByStudentIdAndClassId(student.getId(), msdclass.getId());
				if (null != oldmsdclass)
					unRegisterStudentFromClassByStudentIdAndClassId(student.getId(), oldmsdclass.getId());
			}
		}

		return "Sucess";
	}
}
