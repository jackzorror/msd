package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;

import java.util.Date;


/**
 * The persistent class for the msd_student_checkin database table.
 * 
 */
@Entity
@Table(name="msd_student_checkin")
public class MsdStudentCheckin extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="msd_student_id")
	private int msdStudentId;

	@Column(name="msd_class_id")
	private int msdClassId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="checkin_time")
	private Date checkinTime;

	public MsdStudentCheckin() {
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

	public Date getCheckinTime() {
		return this.checkinTime;
	}

	public void setCheckinTime(Date checkinTime) {
		this.checkinTime = checkinTime;
	}

}