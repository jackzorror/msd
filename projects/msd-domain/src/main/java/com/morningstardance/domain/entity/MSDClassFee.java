package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;

import java.math.BigDecimal;


/**
 * The persistent class for the msd_class_fee database table.
 * 
 */
@Entity
@Table(name="msd_class_fee")
public class MSDClassFee extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	private BigDecimal cost;

	@Column(name="msd_class_id")
	private int msdClassId;

	private String name;

	@Column(name="is_active")
	private byte isActive;

	//bi-directional many-to-one association to MsdCostType
	@ManyToOne
	@JoinColumn(name="cost_type_id")
	private MSDCostType msdCostType;

	public MSDClassFee() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getCost() {
		return this.cost;
	}

	public void setCost(BigDecimal cost) {
		this.cost = cost;
	}

	public int getMsdClassId() {
		return this.msdClassId;
	}

	public void setMsdClassId(int msdClassId) {
		this.msdClassId = msdClassId;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public MSDCostType getMsdCostType() {
		return this.msdCostType;
	}

	public void setMsdCostType(MSDCostType msdCostType) {
		this.msdCostType = msdCostType;
	}

	public byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(byte isActive) {
		this.isActive = isActive;
	}

	public String toString() {
		return "ID: " + getId() + " MSDClass ID: " + getMsdClassId() + " Name: " + getName() + " Cost: " + getCost() + " CostType Id: " + getMsdCostType().getId() + "is Active: " + getIsActive();
	}
}