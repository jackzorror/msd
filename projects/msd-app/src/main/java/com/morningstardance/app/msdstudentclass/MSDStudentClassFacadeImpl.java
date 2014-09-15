package com.morningstardance.app.msdstudentclass;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.morningstardance.app.msdstudent.MSDStudentClassDto;
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
	
	@Override
	public MSDStudentClassDto registerStudentToClass(MSDStudentClassDto studentClassDto) {
		MSDStudentClass entity = studentRegisterClass(studentClassDto.getMsdStudentId(), studentClassDto.getMsdClassId());
		
		MSDStudentClassDto dto = new MSDStudentClassDto();
		dto.setId(entity.getId().intValue());
		dto.setMsdClassId(entity.getMsdClassId());
		dto.setMsdStudentId(entity.getMsdStudentId());
		return dto;
	}

	@Override
	public void deleteRegisteredStudentClass(Long id) {
		msdStudentClassJPARepository.delete(id);
	}

	@Override
	public String registerStudentToClasses(Long msdstudentid, String msdclassidlist) {
		if (null == msdclassidlist || msdclassidlist.isEmpty()) return null;
		String [] ids = msdclassidlist.split(",");
		for (String id : ids) {
			if (null != id && !(id.isEmpty()))
				studentRegisterClass(msdstudentid.intValue(), new Integer(id).intValue());
		}
		
		return "Sucess";
	}
	
	private MSDStudentClass studentRegisterClass(int sid, int cid) {
		MSDStudentClass studentClass = new MSDStudentClass();
		studentClass.setMsdClassId(cid);
		studentClass.setMsdStudentId(sid);
		MSDStudentClass entity = null;
		entity = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentId(cid,	sid);
		if (null == entity) {
			entity = msdStudentClassJPARepository.save(studentClass);
		}
		return entity;
	}

	@Override
	public String deleteRegisterStudentToClasses(Long msdstudentid, String msdclassidlist) {
		if (null == msdclassidlist || msdclassidlist.isEmpty()) return null;
		String [] ids = msdclassidlist.split(",");
		for (String id : ids) {
			if (null != id && !(id.isEmpty()))
				studentDeleteRegisteredClass(msdstudentid.intValue(), new Integer(id).intValue());
		}
		
		return "Sucess";
	}

	private void studentDeleteRegisteredClass(int sid, int cid) {
		MSDStudentClass entity = msdStudentClassJPARepository.findByMsdClassIdAndMsdStudentId(cid, sid);
		if (null != entity) {
			deleteRegisteredStudentClass(entity.getId());
		}
		
	}

	@Override
	public String registerClassByClassNameAndStudentIDlistAndType(String classname, String studentidlist, String oldclassname, String registertype) {
		if (null == registertype || registertype.isEmpty() || null == studentidlist || studentidlist.isEmpty()) return null;
		
		if (registertype.equals("REGISTER") && (null == classname || classname.isEmpty())) return null;
		
		if ((registertype.equals("UPGREATE") || registertype.equals("REMOVE")) && (null == oldclassname || oldclassname.isEmpty())) return null;
		
		if (registertype.equals("REMOVE")) {
			MSDClass oldmsdclass = msdClassJPARepository.findByName(oldclassname);
			if (oldmsdclass == null) return null;

			String sids[] = studentidlist.split(",");
			for (String id : sids) {
				MSDStudent student = msdStudentJPARepository.findOne(new Long(id));
				if (null != student)
					studentDeleteRegisteredClass(student.getId().intValue(), oldmsdclass.getId().intValue());
			}

			return "Sucess";

		}
		
		MSDClass msdclass = msdClassJPARepository.findByName(classname);
		if (null == msdclass) return null;
		
		MSDClass oldmsdclass = null;
		
		if (registertype != null && registertype.equals("UPGREATE") && oldclassname != null && !(oldclassname.isEmpty())) {
			oldmsdclass = msdClassJPARepository.findByName(oldclassname);
			if (oldmsdclass == null) return null;
		}
		
		String sids[] = studentidlist.split(",");
		for (String id : sids) {
			MSDStudent student = msdStudentJPARepository.findOne(new Long(id));
			if (null != student) {
				studentRegisterClass(student.getId().intValue(), msdclass.getId().intValue());
				if (null != oldmsdclass)
					studentDeleteRegisteredClass(student.getId().intValue(), oldmsdclass.getId().intValue());
			}
		}

		return "Sucess";
	}
}
