package com.morningstardance.domain.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.morningstardance.domain.base.entity.MSDEntityBase;


/**
 * The persistent class for the msd_class database table.
 * 
 */
@Entity
@Table(name="msd_class")
public class MSDClass extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	private String location;

	private String name;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="class_start_time")
	private Date classStartTime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="class_end_time")
	private Date classEndTime;
	
	@Column(name="class_status")
	private String classStatus;
	
	@Column(name="is_active")
	private byte isActive;

	public MSDClass() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLocation() {
		return this.location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getClassStartTime() {
		return classStartTime;
	}

	public void setClassStartTime(Date classStartTime) {
		this.classStartTime = classStartTime;
	}

	public Date getClassEndTime() {
		return classEndTime;
	}

	public void setClassEndTime(Date classEndTime) {
		this.classEndTime = classEndTime;
	}

	public String getClassStatus() {
		return classStatus;
	}

	public void setClassStatus(String classStatus) {
		this.classStatus = classStatus;
	}

	public byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(byte isActive) {
		this.isActive = isActive;
	}

}