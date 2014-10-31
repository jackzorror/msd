package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;

import java.util.Date;


/**
 * The persistent class for the msd_competition database table.
 * 
 */
@Entity
@Table(name="msd_competition")
public class MSDCompetition extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	private String description;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="end_date")
	private Date endDate;

	@Column(name="is_active")
	private byte isActive;

	private String location;

	private String name;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="register_deadline")
	private Date registerDeadline;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="start_date")
	private Date startDate;

	//bi-directional many-to-one association to MsdCompetitionType
	@ManyToOne
	@JoinColumn(name="competition_type_id")
	private MSDCompetitionType msdCompetitionType;

	public MSDCompetition() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(byte isActive) {
		this.isActive = isActive;
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

	public Date getRegisterDeadline() {
		return this.registerDeadline;
	}

	public void setRegisterDeadline(Date registerDeadline) {
		this.registerDeadline = registerDeadline;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public MSDCompetitionType getMsdCompetitionType() {
		return this.msdCompetitionType;
	}

	public void setMsdCompetitionType(MSDCompetitionType msdCompetitionType) {
		this.msdCompetitionType = msdCompetitionType;
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		return sb.append("MSDCompetition ID: " + getId())
				 .append(" Name: " + getName())
				 .append(" Location: " + getLocation())
				 .append(" Start: " + getStartDate())
				 .append(" End: " + getEndDate())
				 .append(" Register Deadline:" + getRegisterDeadline())
				 .append(" IsActive: " + getIsActive())
				 .append(" Competition Type: " + getMsdCompetitionType().toString())
				 .append(" Description: " + getDescription()).toString();
	}
}