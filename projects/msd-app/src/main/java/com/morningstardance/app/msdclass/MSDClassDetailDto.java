package com.morningstardance.app.msdclass;

import java.util.List;

import com.morningstardance.app.msdclassschedular.MSDClassSchedularDto;

public class MSDClassDetailDto extends MSDClassDto {

	protected int totalNumberStudent;
	protected List<MSDClassSchedularDto> classSchedularList;

	public int getTotalNumberStudent() {
		return totalNumberStudent;
	}

	public void setTotalNumberStudent(int totalNumberStudent) {
		this.totalNumberStudent = totalNumberStudent;
	}

	public List<MSDClassSchedularDto> getClassSchedularList() {
		return classSchedularList;
	}

	public void setClassSchedularList(List<MSDClassSchedularDto> classSchedularList) {
		this.classSchedularList = classSchedularList;
	}
}
