package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;


/**
 * The persistent class for the msd_student_parent database table.
 * 
 */
@Entity
@Table(name="msd_student_parent")
public class MSDStudentParent extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="cell_phone")
	private String cellPhone;

	@Column(name="email_address")
	private String emailAddress;

	@Column(name="first_name")
	private String firstName;

	@Column(name="last_name")
	private String lastName;

	private String relationship;

	@Column(name="work_phone")
	private String workPhone;

	//bi-directional many-to-one association to MsdStudent
	@ManyToOne
	@JoinColumn(name="msd_student_id")
	private MSDStudent msdStudent;

	public MSDStudentParent() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCellPhone() {
		return this.cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getEmailAddress() {
		return this.emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getRelationship() {
		return this.relationship;
	}

	public void setRelationship(String relationship) {
		this.relationship = relationship;
	}

	public String getWorkPhone() {
		return this.workPhone;
	}

	public void setWorkPhone(String workPhone) {
		this.workPhone = workPhone;
	}

	public MSDStudent getMsdStudent() {
		return this.msdStudent;
	}

	public void setMsdStudent(MSDStudent msdStudent) {
		this.msdStudent = msdStudent;
	}

	public String toString() {
		StringBuffer sb = new StringBuffer();
		return sb.append("MSDStudentParent ID:" + getId())
				 .append(" FirstName:" + getFirstName())
				 .append(" LastName:" + getLastName())
				 .append(" Cell:" + getCellPhone())
				 .append(" work:" + getWorkPhone())
				 .append(" relationship:" + getRelationship())
				 .append(" Email:" + getEmailAddress())
				 .append(" student ID:" + (null != getMsdStudent() ? getMsdStudent().getId() : null)).toString();
	}
}