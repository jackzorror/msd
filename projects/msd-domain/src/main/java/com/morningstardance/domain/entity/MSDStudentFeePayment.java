package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;

import java.math.BigDecimal;
import java.util.Date;


/**
 * The persistent class for the msd_student_fee_payment database table.
 * 
 */
@Entity
@Table(name="msd_student_fee_payment")
public class MSDStudentFeePayment extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="pay_fee")
	private BigDecimal payFee;

	@Column(name="pay_note")
	private String payNote;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="pay_time")
	private Date payTime;

	@Column(name="pay_type")
	private String payType;

	@Column(name="msd_student_fee_id")
	private int msdStudentFeeId;
	
	public MSDStudentFeePayment() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public BigDecimal getPayFee() {
		return this.payFee;
	}

	public void setPayFee(BigDecimal payFee) {
		this.payFee = payFee;
	}

	public String getPayNote() {
		return this.payNote;
	}

	public void setPayNote(String payNote) {
		this.payNote = payNote;
	}

	public Date getPayTime() {
		return this.payTime;
	}

	public void setPayTime(Date payTime) {
		this.payTime = payTime;
	}

	public String getPayType() {
		return this.payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public int getMsdStudentFeeId() {
		return msdStudentFeeId;
	}

	public void setMsdStudentFeeId(int msdStudentFeeId) {
		this.msdStudentFeeId = msdStudentFeeId;
	}

}