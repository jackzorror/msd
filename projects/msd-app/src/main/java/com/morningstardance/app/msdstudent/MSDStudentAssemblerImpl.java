package com.morningstardance.app.msdstudent;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentMedicalInfo;
import com.morningstardance.domain.entity.MSDStudentParent;

@Service("msdStudentAssembler")
public class MSDStudentAssemblerImpl implements MSDStudentAssembler {

    @Resource(name="mapper")
    protected Mapper mapper;

	@Override
	public List<MSDStudentDto> createDtoFromEntity(List<MSDStudent> msdStudents) {
		List<MSDStudentDto> dtos = new ArrayList<MSDStudentDto>();
		for (MSDStudent student : msdStudents) {
			dtos.add(this.createDtoFromEntity(student));
		}
		return dtos;
	}

	@Override
	public MSDStudentDto createDtoFromEntity(MSDStudent msdStudent) {
		if (null == msdStudent) 
			return null;
		MSDStudentDto dto = mapper.map(msdStudent, MSDStudentDto.class);
		return dto;
	}

	@Override
	public MSDStudentDetailDto createDetailDtoFromEntity(MSDStudent msdStudent) {
		if (null == msdStudent)
			return null;
		MSDStudentDetailDto dto = mapper.map(msdStudent, MSDStudentDetailDto.class);
		List<MSDStudentParentDto> pdtos = createStudentParentDtoFromEntity(msdStudent.getMsdStudentParents());
		dto.setMsdStudentParentDtos(pdtos);
		MSDStudentMedicalInfoDto mdto = createStudentMedicalInfoDtoFromEntity(msdStudent.getMsdStudentMedicalInfo());
		dto.setMsdStudentMedicalInfoDto(mdto);
		
		return dto;
	}

	private MSDStudentMedicalInfoDto createStudentMedicalInfoDtoFromEntity(
			MSDStudentMedicalInfo msdStudentMedicalInfo) {
		if (null == msdStudentMedicalInfo)
			return null;
		MSDStudentMedicalInfoDto dto = mapper.map(msdStudentMedicalInfo, MSDStudentMedicalInfoDto.class);
		return dto;
	}

	private List<MSDStudentParentDto> createStudentParentDtoFromEntity(
			List<MSDStudentParent> msdStudentParents) {
		
		if (null == msdStudentParents || msdStudentParents.isEmpty()) return null;
		
		List<MSDStudentParentDto> dtos = new ArrayList<MSDStudentParentDto>();
		
		for (MSDStudentParent p : msdStudentParents) {
			MSDStudentParentDto dto = mapper.map(p, MSDStudentParentDto.class);
			dtos.add(dto);
		}

		return dtos;
	}

	@Override
	public List<MSDStudentDetailDto> createDetailDtoFromEntity(
			List<MSDStudent> msdStudents) {
		List<MSDStudentDetailDto> dtos = new ArrayList<MSDStudentDetailDto>();
		for (MSDStudent student : msdStudents) {
			dtos.add(this.createDetailDtoFromEntity(student));
		}
		return dtos;
	}

	@Override
	public MSDStudent createEntityFromDetailDto(
			MSDStudentDetailDto msdStudentDetailDto) {
		List<MSDStudentParent> ps = null;
		MSDStudent student = mapper.map(msdStudentDetailDto, MSDStudent.class);
		if (null != msdStudentDetailDto.getMsdStudentParentDtos() && msdStudentDetailDto.getMsdStudentParentDtos().size() > 0) {
			ps = new ArrayList<MSDStudentParent>();
			for (MSDStudentParentDto pdto : msdStudentDetailDto.getMsdStudentParentDtos()) {
				if (null != pdto) {
					MSDStudentParent p = mapper.map(pdto, MSDStudentParent.class);
					p.setMsdStudent(student);
					ps.add(p);
				}
			}
			student.setMsdStudentParents(ps);
		}
		if (null != msdStudentDetailDto.getMsdStudentMedicalInfoDto()) {
			MSDStudentMedicalInfo sm = mapper.map(msdStudentDetailDto.getMsdStudentMedicalInfoDto(), MSDStudentMedicalInfo.class);
			sm.setMsdStudent(student);
			student.setMsdStudentMedicalInfos(sm);
		}
		
		return student;
	}

}
