package com.morningstardance.domain.entity;

import java.io.Serializable;
import java.text.SimpleDateFormat;

import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;


/**
 * The persistent class for the msd_student_competition database table.
 * 
 */
@Entity
@Table(name="msd_student_competition")
public class MSDStudentCompetition extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="is_active")
	private byte isActive;

	@Column(name="msd_competition_id")
	private int msdCompetitionId;

	@Column(name="msd_student_id")
	private int msdStudentId;

	public MSDStudentCompetition() {
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append("StudentCompetition--> id: %d Student id: %d  Competition id: %d IsActive: %x");
		return String.format(sb.toString(), id.intValue(), msdStudentId, msdCompetitionId, isActive);
	}
	
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(byte isActive) {
		this.isActive = isActive;
	}

	public int getMsdComptitionId() {
		return this.msdCompetitionId;
	}

	public void setMsdComptitionId(int msdComptitionId) {
		this.msdCompetitionId = msdComptitionId;
	}

	public int getMsdStudentId() {
		return this.msdStudentId;
	}

	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
	}

}