package com.morningstardance.domain.entity;

import java.io.Serializable;

import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;


/**
 * The persistent class for the msd_class_schedular database table.
 * 
 */
@Entity
@Table(name="msd_class_schedular")
public class MSDClassSchedular extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="msd_class_id")
	private int msdClassId;

	@Column(name="start_time")
	private String startTime;

	@Column(name="end_time")
	private String endTime;

	private int weekday;

	@Column(name="is_active")
	private byte isActive;

	public MSDClassSchedular() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getMsdClassId() {
		return this.msdClassId;
	}

	public void setMsdClassId(int msdClassId) {
		this.msdClassId = msdClassId;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public int getWeekday() {
		return weekday;
	}

	public void setWeekday(int weekday) {
		this.weekday = weekday;
	}

	public byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(byte isActive) {
		this.isActive = isActive;
	}

}