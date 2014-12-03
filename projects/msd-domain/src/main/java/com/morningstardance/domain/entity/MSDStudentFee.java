package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;

import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * The persistent class for the msd_student_fee database table.
 * 
 */
@Entity
@Table(name="msd_student_fee")
public class MSDStudentFee extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="is_active")
	private byte isActive;

	@Column(name="is_paid")
	private byte isPaid;

	@Column(name="is_waiver")
	private byte isWaiver;

	@Column(name="msd_student_fee_object_id")
	private int msdStudentFeeObjectId;

	@Column(name="msd_student_fee_object_name")
	private String msdStudentFeeObjectName;

	@Column(name="pay_note")
	private String payNote;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="pay_time")
	private Date payTime;

	@Column(name="pay_type")
	private String payType;

	@Column(name="msd_student_id")
	private int msdStudentId;
	
	@Column(name="fee_note")
	private String feeNote;

	public MSDStudentFee() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(byte isActive) {
		this.isActive = isActive;
	}

	public byte getIsPaid() {
		return this.isPaid;
	}

	public void setIsPaid(byte isPaid) {
		this.isPaid = isPaid;
	}

	public byte getIsWaiver() {
		return this.isWaiver;
	}

	public void setIsWaiver(byte isWaiver) {
		this.isWaiver = isWaiver;
	}

	public int getMsdStudentFeeObjectId() {
		return this.msdStudentFeeObjectId;
	}

	public void setMsdStudentFeeObjectId(int msdStudentFeeObjectId) {
		this.msdStudentFeeObjectId = msdStudentFeeObjectId;
	}

	public String getMsdStudentFeeObjectName() {
		return this.msdStudentFeeObjectName;
	}

	public void setMsdStudentFeeObjectName(String msdStudentFeeObjectName) {
		this.msdStudentFeeObjectName = msdStudentFeeObjectName;
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

	public int getMsdStudentId() {
		return msdStudentId;
	}

	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
	}

	public String getFeeNote() {
		return feeNote;
	}

	public void setFeeNote(String feeNote) {
		this.feeNote = feeNote;
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append("StudentFee--> id: %d Student id: %d Object Name: %s Object Id: %d");
		sb.append(" IsActive: %x IsPaid: %x IsWaiver: %x PayTime: %s PayType: %s PayNot: %s FeeNot: %s");
		return String.format(sb.toString(), id.intValue(), msdStudentId, msdStudentFeeObjectName, msdStudentFeeObjectId,
				isActive, isPaid, isWaiver, null != payTime ? new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(payTime) : "n/a", 
				payType, payNote, feeNote);
	}
}