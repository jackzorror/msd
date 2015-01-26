package com.morningstardance.app.msdstudent;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.springframework.stereotype.Service;

import com.morningstardance.domain.entity.MSDClassFee;
import com.morningstardance.domain.entity.MSDCompetitionFee;
import com.morningstardance.domain.entity.MSDGeneralFee;
import com.morningstardance.domain.entity.MSDStudent;
import com.morningstardance.domain.entity.MSDStudentCredit;
import com.morningstardance.domain.entity.MSDStudentFee;
import com.morningstardance.domain.entity.MSDStudentMedicalInfo;
import com.morningstardance.domain.entity.MSDStudentParent;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDCompetitionFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDGeneralFeeJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentCreditJPARepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDStudentFeeJPARepository;

@Service("msdStudentAssembler")
public class MSDStudentAssemblerImpl implements MSDStudentAssembler {

    @Resource(name="mapper")
    protected Mapper mapper;

    @Resource
    MSDStudentFeeJPARepository msdStudentFeeJPARepository;
    
    @Resource
    MSDClassFeeJPARepository msdClassFeeJPARepository;
    
    @Resource
    MSDCompetitionFeeJPARepository msdCompetitionFeeJPARepository;
    
    @Resource
    MSDGeneralFeeJPARepository msdGeneralFeeJPARepository;
    
    @Resource
    MSDStudentCreditJPARepository msdStudentCreditJPARepository;
    
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
		dto.setBalance(getStudentBalanceById(msdStudent.getId()));
		dto.setPhone(getStudentTopTwoPhone(msdStudent));
		return dto;
	}

	private String getStudentTopTwoPhone(MSDStudent msdStudent) {
		if (null == msdStudent) return null;
		int done = 2;
		String phone = "";
		if (done != 0 && null != msdStudent.getMsdStudentParents() && msdStudent.getMsdStudentParents().size() > 0) {
			if (null != msdStudent.getMsdStudentParents().get(0).getCellPhone() &&
					!msdStudent.getMsdStudentParents().get(0).getCellPhone().isEmpty()) {
				phone += msdStudent.getMsdStudentParents().get(0).getCellPhone() + "(pc) ";
				done--;
			} else if (null != msdStudent.getMsdStudentParents().get(0).getWorkPhone() &&
					!msdStudent.getMsdStudentParents().get(0).getWorkPhone().isEmpty()) {
				phone += msdStudent.getMsdStudentParents().get(0).getWorkPhone() + "(pw) ";
				done--;
			}
		}
		if (done != 0 && null != msdStudent.getMsdStudentParents() && msdStudent.getMsdStudentParents().size() > 1) {
			if (null != msdStudent.getMsdStudentParents().get(1).getCellPhone() &&
					!msdStudent.getMsdStudentParents().get(1).getCellPhone().isEmpty()) {
				phone += msdStudent.getMsdStudentParents().get(1).getCellPhone() + "(pc) ";
				done--;
			} else if (null != msdStudent.getMsdStudentParents().get(1).getWorkPhone() &&
					!msdStudent.getMsdStudentParents().get(1).getWorkPhone().isEmpty()) {
				phone += msdStudent.getMsdStudentParents().get(1).getWorkPhone() + "(pw) ";
				done--;
			}
		}
		if (done != 0 && null != msdStudent.getHomePhone() && !msdStudent.getHomePhone().isEmpty()) {
			phone += msdStudent.getHomePhone() + "(h) ";
			done--;
		}
		if (done != 0 && null != msdStudent.getCellPhone() && !msdStudent.getCellPhone().isEmpty()) {
			phone += msdStudent.getCellPhone() + "(c)";
			done--;
		}
		return phone;
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
		
		dto.setBalance(getStudentBalanceById(msdStudent.getId()));
		return dto;
	}

	@Override
	public double getStudentBalanceById(Long id) {
		if (null == id || id.intValue() == 0) return 0;
		
		double totalFees = 0.0;
		List<MSDStudentFee> fees = msdStudentFeeJPARepository.findByMsdStudentIdAndIsActive(id.intValue(), (byte) 1);
		for(MSDStudentFee fee : fees) {
			if (fee.getIsPaid() == (byte) 1 || fee.getIsWaiver() == (byte) 1) continue;
			
			totalFees += fee.getFee().doubleValue();
		}
		double totalCredit = 0.0;
		List<MSDStudentCredit> credits = msdStudentCreditJPARepository.findByMsdStudentIdAndIsActive(id.intValue(), (byte) 1);
		for (MSDStudentCredit credit : credits) {
			if (credit.getIsConsumed() == (byte) 1) continue;
			
			totalCredit += credit.getCredit().doubleValue();
		}
		
		return totalFees - totalCredit;
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
