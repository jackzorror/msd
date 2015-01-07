package com.morningstardance.app.misc;

public class MSDFileNameDto {
	private String fileName;
	private String filePath;
	private String fileType;

	public MSDFileNameDto(String name, String path, String type) {
		this.setFileName(name);
		this.setFilePath(path);
		this.setFileType(type);
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
}
