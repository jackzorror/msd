package com.morningstardance.app.msdstudent;

import java.util.Date;
import java.util.List;

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
	private byte isActive;
	private List<MSDStudentParentDto> msdStudentParentDtos;
	
	private MSDStudentMedicalInfoDto msdStudentMedicalInfoDto;
	
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
	public byte getIsActive() {
		return isActive;
	}
	public void setIsActive(byte isActive) {
		this.isActive = isActive;
	}
}
