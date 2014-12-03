package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;

import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * The persistent class for the msd_student_checkin database table.
 * 
 */
@Entity
@Table(name="msd_student_checkin")
public class MsdStudentCheckin extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="msd_student_id")
	private int msdStudentId;

	@Column(name="msd_class_id")
	private int msdClassId;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="checkin_time")
	private Date checkinTime;

	@Column(name="is_makeup")
	private Byte isMakeup;

	@Column(name="is_fivehoursmore")
	private Byte isFivehoursmore;

	@Column(name="is_other")
	private Byte isOther;

	@Column(name="note")
	private String note;

	public MsdStudentCheckin() {
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		sb.append("StudentCheckIn--> id: %d Student id: %d  Class id: %d checkin time: %s note: %s)"); 
		sb.append(" isMakeup: %x isFivehoursmore %x isOther %x");
		return String.format(sb.toString(), id.intValue(), msdStudentId, msdClassId, 
				null != checkinTime ? new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(checkinTime) : "n/a",
				note, isMakeup, isFivehoursmore, isOther);
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getMsdStudentId() {
		return msdStudentId;
	}

	public void setMsdStudentId(int msdStudentId) {
		this.msdStudentId = msdStudentId;
	}

	public int getMsdClassId() {
		return msdClassId;
	}

	public void setMsdClassId(int msdClassId) {
		this.msdClassId = msdClassId;
	}

	public Date getCheckinTime() {
		return this.checkinTime;
	}

	public void setCheckinTime(Date checkinTime) {
		this.checkinTime = checkinTime;
	}

	public Byte getIsMakeup() {
		return isMakeup;
	}

	public void setIsMakeup(Byte isMakeup) {
		this.isMakeup = isMakeup;
	}

	public Byte getIsFivehoursmore() {
		return isFivehoursmore;
	}

	public void setIsFivehoursmore(Byte isFivehoursmore) {
		this.isFivehoursmore = isFivehoursmore;
	}

	public Byte getIsOther() {
		return isOther;
	}

	public void setIsOther(Byte isOther) {
		this.isOther = isOther;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

}