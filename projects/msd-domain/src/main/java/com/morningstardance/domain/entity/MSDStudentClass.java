package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the msd_student_class database table.
 * 
 */
@Entity
@Table(name="msd_student_class")
public class MSDStudentClass implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private MSDStudentClassPK id;

	public MSDStudentClass() {
	}

	public MSDStudentClassPK getId() {
		return this.id;
	}

	public void setId(MSDStudentClassPK id) {
		this.id = id;
	}

}