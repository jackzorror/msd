package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;

import java.math.BigDecimal;


/**
 * The persistent class for the msd_general_fee database table.
 * 
 */
@Entity
@Table(name="msd_general_fee")
public class MSDGeneralFee extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	private BigDecimal cost;

	//bi-directional many-to-one association to MsdCostType
	@ManyToOne
	@JoinColumn(name="fee_type_id")
	private MSDType msdFeeType;

	@Column(name="is_active")
	private byte isActive;

	private String name;

	public MSDGeneralFee() {
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append("GeneralFee--> id: %d name: %s  cost: %f IsActive: %x Cost Type: %s");
		return String.format(sb.toString(), id.intValue(), name, cost.floatValue(), isActive, msdFeeType.toString());
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

	public byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(byte isActive) {
		this.isActive = isActive;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public MSDType getMsdFeeType() {
		return this.msdFeeType;
	}

	public void setMsdFeeType(MSDType msdFeeType) {
		this.msdFeeType = msdFeeType;
	}

}