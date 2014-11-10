package com.morningstardance.domain.entity;

import java.io.Serializable;
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

	@Column(name="msd_comptition_id")
	private int msdComptitionId;

	@Column(name="msd_student_id")
	private int msdStudentId;

	public MSDStudentCompetition() {
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
		return this.msdComptitionId;
	}

	public void setMsdComptitionId(int msdComptitionId) {
		this.msdComptitionId = msdComptitionId;
	}

	public int getMsdStudentId() {
		return this.msdStudentId;
	}

	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
	}

}