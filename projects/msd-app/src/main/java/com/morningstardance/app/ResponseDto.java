package com.morningstardance.app;

public class ResponseDto {

	private Long code;
   	private Object resourceId;
   	private String message;
   	
	public Long getCode() {
		return code;
	}
	public void setCode(Long code) {
		this.code = code;
	}
	public Object getResourceId() {
		return resourceId;
	}
	public void setResourceId(Object resourceId) {
		this.resourceId = resourceId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
   	
   	
}
