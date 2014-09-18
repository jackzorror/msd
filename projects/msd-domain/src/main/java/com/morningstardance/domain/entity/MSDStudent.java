package com.morningstardance.domain.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.morningstardance.domain.base.entity.MSDEntityBase;


/**
 * The persistent class for the msd_student database table.
 * 
 */
@Entity
@Table(name="msd_student")
public class MSDStudent extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="cell_phone")
	private String cellPhone;

	@Temporal(TemporalType.TIMESTAMP)
	private Date dob;

	@Column(name="email_address")
	private String emailAddress;

	@Column(name="first_name")
	private String firstName;

	private String gender;

	@Column(name="home_address")
	private String homeAddress;

	@Column(name="home_phone")
	private String homePhone;

	@Column(name="last_name")
	private String lastName;

	@Column(name="school_grade")
	private String schoolGrade;

	@Column(name="school_name")
	private String schoolName;

	//bi-directional one-to-one association to MsdStudentMedicalInfo
	@OneToOne(mappedBy="msdStudent", fetch=FetchType.EAGER, cascade={CascadeType.ALL})
	private MSDStudentMedicalInfo msdStudentMedicalInfo;

	//bi-directional many-to-one association to MsdStudentParent
	@OneToMany(mappedBy="msdStudent", fetch=FetchType.EAGER, cascade={CascadeType.ALL})
//	@Fetch(value = FetchMode.SUBSELECT)
	private List<MSDStudentParent> msdStudentParents;

	@Column(name="is_active")
	private byte isActive;

	public MSDStudent() {
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

	public Date getDob() {
		return this.dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
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

	public String getGender() {
		return this.gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getHomeAddress() {
		return this.homeAddress;
	}

	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}

	public String getHomePhone() {
		return this.homePhone;
	}

	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSchoolGrade() {
		return this.schoolGrade;
	}

	public void setSchoolGrade(String schoolGrade) {
		this.schoolGrade = schoolGrade;
	}

	public String getSchoolName() {
		return this.schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public MSDStudentMedicalInfo getMsdStudentMedicalInfo() {
		return this.msdStudentMedicalInfo;
	}

	public void setMsdStudentMedicalInfos(MSDStudentMedicalInfo msdStudentMedicalInfo) {
		this.msdStudentMedicalInfo = msdStudentMedicalInfo;
	}

	public List<MSDStudentParent> getMsdStudentParents() {
		return this.msdStudentParents;
	}

	public void setMsdStudentParents(List<MSDStudentParent> msdStudentParents) {
		this.msdStudentParents = msdStudentParents;
	}

	public byte getIsActive() {
		return this.isActive;
	}

	public void setIsActive(byte isActive) {
		this.isActive = isActive;
	}

}