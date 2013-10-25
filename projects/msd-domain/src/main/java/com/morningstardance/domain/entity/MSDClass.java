package com.morningstardance.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.morningstardance.domain.base.entity.MSDEntityBase;


/**
 * The persistent class for the msd_class database table.
 * 
 */
@Entity
@Table(name="msd_class")
public class MSDClass extends MSDEntityBase {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	private String location;

	private String name;

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

}