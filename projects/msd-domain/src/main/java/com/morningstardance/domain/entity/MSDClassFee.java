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
	private MSDType msdType;
	
	@Column(name="one_time_pay")
	private BigDecimal oneTimePay;

	@Column(name="monthly_pay")
	private BigDecimal monthlyPay;
	
	@Column(name="weekly_pay")
	private BigDecimal weeklyPay;
	
	@Column(name="daily_pay")
	private BigDecimal dailyPay;
	
	@Column(name="times_pay")
	private BigDecimal timesPay;
	
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

	public MSDType getMsdType() {
		return this.msdType;
	}

	public void setMsdType(MSDType msdType) {
		this.msdType = msdType;
	}

	public byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(byte isActive) {
		this.isActive = isActive;
	}

	public BigDecimal getOneTimePay() {
		return oneTimePay;
	}

	public void setOneTimePay(BigDecimal oneTimePay) {
		this.oneTimePay = oneTimePay;
	}

	public BigDecimal getMonthlyPay() {
		return monthlyPay;
	}

	public void setMonthlyPay(BigDecimal monthlyPay) {
		this.monthlyPay = monthlyPay;
	}

	public BigDecimal getWeeklyPay() {
		return weeklyPay;
	}

	public void setWeeklyPay(BigDecimal weeklyPay) {
		this.weeklyPay = weeklyPay;
	}

	public BigDecimal getDailyPay() {
		return dailyPay;
	}

	public void setDailyPay(BigDecimal dailyPay) {
		this.dailyPay = dailyPay;
	}

	public BigDecimal getTimesPay() {
		return timesPay;
	}

	public void setTimesPay(BigDecimal timesPay) {
		this.timesPay = timesPay;
	}

	public String toString() {
		return "ID: " + getId() + " MSDClass ID: " + getMsdClassId() + " Name: " + getName() + " Cost: " + getCost() + " CostType Id: " + getMsdType().getId() + "is Active: " + getIsActive();
	}
}