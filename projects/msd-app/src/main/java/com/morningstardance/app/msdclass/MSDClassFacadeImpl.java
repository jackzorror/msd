package com.morningstardance.app.msdclass;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.morningstardance.domain.entity.MSDClass;
import com.morningstardance.domain.msdclass.MSDClassRepository;
import com.morningstardance.domain.springdata.jpa.repository.MSDClassJPARepository;

@Service("msdClassFacade")
public class MSDClassFacadeImpl implements MSDClassFacade {
	
	@Resource(name="msdClassRepository")
	protected MSDClassRepository msdClassRepository;
	
	@Resource(name="msdClassAssembler")
	protected MSDClassAssembler msdClassAssembler;
	
    @Resource
    private MSDClassJPARepository msdClassJPARepository;


	@Override
	public MSDClassDto getMSDClassById(Long msdclassId) {
		MSDClass msdclass = msdClassRepository.findById(msdclassId);
		return msdClassAssembler.createDtoFromEntity(msdclass);
	}

	@Override
	public List<MSDClassDto> getAllMSDClass() {
		List<MSDClass> msdclasses = msdClassRepository.getAll();
		List<MSDClass> msdclassestwo = this.findAll();
		return msdClassAssembler.createDtoFromEntity(msdclasses);
	}
	
    @Transactional(readOnly = true)
    @Override
    public List<MSDClass> findAll() {
        return msdClassJPARepository.findAll();
    }
	

}
