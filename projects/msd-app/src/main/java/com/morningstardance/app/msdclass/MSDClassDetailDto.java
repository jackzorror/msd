package com.morningstardance.app.msdclass;

import java.math.BigDecimal;
import java.util.List;

import com.morningstardance.app.msdclassfee.MSDClassFeeDto;
import com.morningstardance.app.msdclassschedular.MSDClassSchedularDto;
import com.morningstardance.domain.entity.MSDClassNonClassDate;

public class MSDClassDetailDto extends MSDClassDto {

	protected int totalNumberStudent;
	protected BigDecimal totalClassFee;
	protected int totalClassCount;
	protected List<MSDClassSchedularDto> classSchedularList;
	protected List<MSDClassFeeDto> classFeeList;
	protected List<MSDClassNonClassDate> nonClassDateList;

	public int getTotalNumberStudent() {
		return totalNumberStudent;
	}

	public void setTotalNumberStudent(int totalNumberStudent) {
		this.totalNumberStudent = totalNumberStudent;
	}

	public BigDecimal getTotalClassFee() {
		return totalClassFee;
	}

	public void setTotalClassFee(BigDecimal totalClassFee) {
		this.totalClassFee = totalClassFee;
	}

	public int getTotalClassCount() {
		return totalClassCount;
	}

	public void setTotalClassCount(int totalClassCount) {
		this.totalClassCount = totalClassCount;
	}

	public List<MSDClassSchedularDto> getClassSchedularList() {
		return classSchedularList;
	}

	public void setClassSchedularList(List<MSDClassSchedularDto> classSchedularList) {
		this.classSchedularList = classSchedularList;
	}

	public List<MSDClassFeeDto> getClassFeeList() {
		return classFeeList;
	}

	public void setClassFeeList(List<MSDClassFeeDto> classFeeList) {
		this.classFeeList = classFeeList;
	}

	public List<MSDClassNonClassDate> getNonClassDateList() {
		return nonClassDateList;
	}

	public void setNonClassDateList(List<MSDClassNonClassDate> nonClassDateList) {
		this.nonClassDateList = nonClassDateList;
	}
}
