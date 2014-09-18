package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.morningstardance.domain.base.entity.MSDEntityBase;


/**
 * The persistent class for the msd_student_medical_info database table.
 * 
 */
@Entity
@Table(name="msd_student_medical_info")
public class MSDStudentMedicalInfo extends MSDEntityBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	@Column(name="emergency_name")
	private String emergencyName;

	@Column(name="emergency_phone")
	private String emergencyPhone;

	@Column(name="emergency_phone_alt")
	private String emergencyPhoneAlt;

	@Column(name="insurance_company")
	private String insuranceCompany;

	@Column(name="pediatrician_name")
	private String pediatricianName;

	private String phone;

	@Column(name="policy_number")
	private String policyNumber;

	//bi-directional many-to-one association to MsdStudent
	@OneToOne
	@JoinColumn(name="msd_student_id")
	private MSDStudent msdStudent;

	public MSDStudentMedicalInfo() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmergencyName() {
		return this.emergencyName;
	}

	public void setEmergencyName(String emergencyName) {
		this.emergencyName = emergencyName;
	}

	public String getEmergencyPhone() {
		return this.emergencyPhone;
	}

	public void setEmergencyPhone(String emergencyPhone) {
		this.emergencyPhone = emergencyPhone;
	}

	public String getEmergencyPhoneAlt() {
		return this.emergencyPhoneAlt;
	}

	public void setEmergencyPhoneAlt(String emergencyPhoneAlt) {
		this.emergencyPhoneAlt = emergencyPhoneAlt;
	}

	public String getInsuranceCompany() {
		return this.insuranceCompany;
	}

	public void setInsuranceCompany(String insuranceCompany) {
		this.insuranceCompany = insuranceCompany;
	}

	public String getPediatricianName() {
		return this.pediatricianName;
	}

	public void setPediatricianName(String pediatricianName) {
		this.pediatricianName = pediatricianName;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPolicyNumber() {
		return this.policyNumber;
	}

	public void setPolicyNumber(String policyNumber) {
		this.policyNumber = policyNumber;
	}

	public MSDStudent getMsdStudent() {
		return this.msdStudent;
	}

	public void setMsdStudent(MSDStudent msdStudent) {
		this.msdStudent = msdStudent;
	}

}