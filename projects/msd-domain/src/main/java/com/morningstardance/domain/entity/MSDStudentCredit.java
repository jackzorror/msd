package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * The persistent class for the msd_student_credit database table.
 * 
 */
@Entity
@Table(name="msd_student_credit")
public class MSDStudentCredit extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	private BigDecimal credit;

	@Column(name="is_active")
	private byte isActive;

	@Column(name="is_consumed")
	private byte isConsumed;

	@Column(name="msd_student_id")
	private int msdStudentId;

	@Column(name="credit_note")
	private String creditNote;

	@Column(name="consume_note")
	private String consumeNote;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="consumed_date")
	private Date consumedDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="credit_date")
	private Date creditDate;
	
	private int semester;

	public MSDStudentCredit() {
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append("StudentCredit--> id: %d Student id: %d  IsActive: %x IsConsumed: %x");
		sb.append(" creditNote: %s creditDate: %s consumeNote: %s consumeDate: %s credit: %f semester: %d");
		return String.format(sb.toString(), id.intValue(), msdStudentId, isActive, isConsumed, 
				creditNote, null != creditDate ? new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(creditDate) : "n/a",
				consumeNote, null != consumedDate ? new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(consumedDate) : "n/a",
				credit.floatValue(), semester);
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

	public int getMsdStudentId() {
		return this.msdStudentId;
	}

	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
	}

	public BigDecimal getCredit() {
		return credit;
	}

	public void setCredit(BigDecimal credit) {
		this.credit = credit;
	}

	public byte getIsConsumed() {
		return isConsumed;
	}

	public void setIsConsumed(byte isConsumed) {
		this.isConsumed = isConsumed;
	}

	public String getCreditNote() {
		return creditNote;
	}

	public void setCreditNote(String creditNote) {
		this.creditNote = creditNote;
	}

	public String getConsumeNote() {
		return consumeNote;
	}

	public void setConsumeNote(String consumeNote) {
		this.consumeNote = consumeNote;
	}

	public Date getConsumedDate() {
		return consumedDate;
	}

	public void setConsumedDate(Date consumedDate) {
		this.consumedDate = consumedDate;
	}

	public Date getCreditDate() {
		return creditDate;
	}

	public void setCreditDate(Date creditDate) {
		this.creditDate = creditDate;
	}

	public int getSemester() {
		return semester;
	}

	public void setSemester(int semester) {
		this.semester = semester;
	}

}