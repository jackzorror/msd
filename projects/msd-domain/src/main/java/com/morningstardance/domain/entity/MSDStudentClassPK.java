package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the msd_student_class database table.
 * 
 */
@Embeddable
public class MSDStudentClassPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="msd_student_id")
	private int msdStudentId;

	@Column(name="msd_class_id")
	private int msdClassId;

	public MSDStudentClassPK() {
	}
	public Long getId() {
		return this.id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getMsdStudentId() {
		return this.msdStudentId;
	}
	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
	}
	public int getMsdClassId() {
		return this.msdClassId;
	}
	public void setMsdClassId(int msdClassId) {
		this.msdClassId = msdClassId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof MSDStudentClassPK)) {
			return false;
		}
		MSDStudentClassPK castOther = (MSDStudentClassPK)other;
		return 
			(this.id == castOther.id)
			&& (this.msdStudentId == castOther.msdStudentId)
			&& (this.msdClassId == castOther.msdClassId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.id.intValue();
		hash = hash * prime + this.msdStudentId;
		hash = hash * prime + this.msdClassId;
		
		return hash;
	}
}