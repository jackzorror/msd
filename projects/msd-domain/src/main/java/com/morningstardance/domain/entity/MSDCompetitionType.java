package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;

/**
 * The persistent class for the msd_competition_type database table.
 * 
 */
@Entity
@Table(name="msd_competition_type")
public class MSDCompetitionType extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;


	private String name;

	public MSDCompetitionType() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		return sb.append("MSDCompetitionType ID: " + getId())
				 .append(" Name: " + getName()).toString();
	}
}