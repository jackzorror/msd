package com.morningstardance.domain.msdclass;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.morningstardance.domain.base.repository.MSDBaseRepository;
import com.morningstardance.domain.entity.MSDClass;

@Repository("msdClassRepository")
public class MSDClassRepository extends MSDBaseRepository<MSDClass> {
	public MSDClass findById(Long id) {
		return findById(MSDClass.class, id);
	}

	@SuppressWarnings("unchecked")
	public List<MSDClass> getAll() {
		Query query = this.getEntityManager().createNativeQuery(
				"SELECT * From msd_class", 
				MSDClass.class);
		return (List<MSDClass>)query.getResultList();
	}
}
