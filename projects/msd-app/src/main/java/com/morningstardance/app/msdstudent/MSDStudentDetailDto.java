package com.morningstardance.app.msdstudent;

import java.util.Date;
import java.util.List;
import java.util.Set;

public class MSDStudentDetailDto extends MSDStudentDto {
	private int id;
	private String firstName;
	private String lastName;
	private String cellPhone;
	private String emailAddress;
	private Date dob;
	private String gender;
	private String homeAddress;
	private String homePhone;
	private String schoolGrade;
	private String schoolName;
	private List<MSDStudentParentDto> msdStudentParentDtos;
	
	private MSDStudentMedicalInfoDto msdStudentMedicalInfoDto;
//	private int msdStudentMedicalInfoId;
//	private String emergencyName;
//	private String emergencyPhone;
//	private String emergencyPhoneAlt;
//	private String insuranceCompany;
//	private String pediatricianName;
//	private String phone;
//	private String policyNumber;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getCellPhone() {
		return cellPhone;
	}
	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getHomeAddress() {
		return homeAddress;
	}
	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}
	public String getHomePhone() {
		return homePhone;
	}
	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}
	public String getSchoolGrade() {
		return schoolGrade;
	}
	public void setSchoolGrade(String schoolGrade) {
		this.schoolGrade = schoolGrade;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public List<MSDStudentParentDto> getMsdStudentParentDtos() {
		return msdStudentParentDtos;
	}
	public void setMsdStudentParentDtos(
			List<MSDStudentParentDto> msdStudentParentDtos) {
		this.msdStudentParentDtos = msdStudentParentDtos;
	}
//	public int getMsdStudentMedicalInfoId() {
//		return msdStudentMedicalInfoId;
//	}
//	public void setMsdStudentMedicalInfoId(int msdStudentMedicalInfoId) {
//		this.msdStudentMedicalInfoId = msdStudentMedicalInfoId;
//	}
//	public String getEmergencyName() {
//		return emergencyName;
//	}
//	public void setEmergencyName(String emergencyName) {
//		this.emergencyName = emergencyName;
//	}
//	public String getEmergencyPhone() {
//		return emergencyPhone;
//	}
//	public void setEmergencyPhone(String emergencyPhone) {
//		this.emergencyPhone = emergencyPhone;
//	}
//	public String getEmergencyPhoneAlt() {
//		return emergencyPhoneAlt;
//	}
//	public void setEmergencyPhoneAlt(String emergencyPhoneAlt) {
//		this.emergencyPhoneAlt = emergencyPhoneAlt;
//	}
//	public String getInsuranceCompany() {
//		return insuranceCompany;
//	}
//	public void setInsuranceCompany(String insuranceCompany) {
//		this.insuranceCompany = insuranceCompany;
//	}
//	public String getPediatricianName() {
//		return pediatricianName;
//	}
//	public void setPediatricianName(String pediatricianName) {
//		this.pediatricianName = pediatricianName;
//	}
//	public String getPhone() {
//		return phone;
//	}
//	public void setPhone(String phone) {
//		this.phone = phone;
//	}
//	public String getPolicyNumber() {
//		return policyNumber;
//	}
//	public void setPolicyNumber(String policyNumber) {
//		this.policyNumber = policyNumber;
//	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public MSDStudentMedicalInfoDto getMsdStudentMedicalInfoDto() {
		return msdStudentMedicalInfoDto;
	}
	public void setMsdStudentMedicalInfoDto(
			MSDStudentMedicalInfoDto msdStudentMedicalInfoDto) {
		this.msdStudentMedicalInfoDto = msdStudentMedicalInfoDto;
	}
	

}
