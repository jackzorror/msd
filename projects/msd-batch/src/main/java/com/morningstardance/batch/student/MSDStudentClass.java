package com.morningstardance.batch.student;

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

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="msd_student_id")
	private int msdStudentId;

	@Column(name="msd_class_id")
	private int msdClassId;

	@Column(name="is_active")
	private byte isActive;

	public MSDStudentClass() {
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append("StudentClass--> id: %d Student id: %d  Class id: %d IsActive: %x");
		return String.format(sb.toString(), id.intValue(), msdStudentId, msdClassId, isActive);
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getMsdStudentId() {
		return msdStudentId;
	}

	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
	}

	public int getMsdClassId() {
		return msdClassId;
	}

	public void setMsdClassId(int msdClassId) {
		this.msdClassId = msdClassId;
	}

	public byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(byte isActive) {
		this.isActive = isActive;
	}
}