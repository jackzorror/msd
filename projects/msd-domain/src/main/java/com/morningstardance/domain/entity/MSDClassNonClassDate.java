package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;

import java.util.Date;


/**
 * The persistent class for the msd_class_non_class_date database table.
 * 
 */
@Entity
@Table(name="msd_class_non_class_date")
public class MSDClassNonClassDate extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="msd_class_id")
	private int msdClassId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="non_class_date")
	private Date nonClassDate;

	public MSDClassNonClassDate() {
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

	public Date getNonClassDate() {
		return this.nonClassDate;
	}

	public void setNonClassDate(Date nonClassDate) {
		this.nonClassDate = nonClassDate;
	}

}