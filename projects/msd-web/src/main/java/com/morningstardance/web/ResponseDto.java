package com.morningstardance.web;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

public class ResponseDto {

	private Long code;
   	private Object resourceId;
   	private String message;
   	private Object result;
   	
   	public ResponseDto() {
   	}
   	
   	public ResponseDto(Long code, Object resourceId, String message, Object result) {
   		this.code = code;
   		this.resourceId = resourceId;
   		this.message = message;
   		this.result = result;
   	}
   	
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
	public Object getResult() {
		return result;
	}
	public void setResult(Object result) {
		this.result = result;
	}
   	
   	@SuppressWarnings("rawtypes")
	static public ResponseDto createResponseDto(Object object, String requestType, String resultType, Object id) {
   		ResponseDto dto = new ResponseDto();
   		if ("GET".equals(requestType)) {
   			if (null != object) {
   				dto.setMessage("found");
   				dto.setCode(302L);
   			} else {
   				dto.setMessage("not found");
   				dto.setCode(404L);
   			}
   		} else if ("POST".equals(requestType)) {
   			if (null != object) {
   				dto.setMessage("create");
   			} else {
   				dto.setMessage("not create");
   			}
   		} else if ("PUT".equals(requestType)) {
   			if (null != object) {
   				dto.setMessage("update");
   			} else {
   				dto.setMessage("not update");
   			}
   		} else if ("DELETE".equals(requestType)) {
   			if (null != object) {
   				dto.setMessage("delete");
   			} else {
   				dto.setMessage("not delete");
   			}
   		}
   		
   		if ("ARRAY".equals(resultType)) {
   			if (null != object && ((List)object).size() > 0) {
   				JSONArray jsons = new JSONArray(object);
   				dto.setResult(jsons.toString());
   			}
   		} else if ("OBJECT".equals(resultType)) {
   			if (null != object) {
   				JSONObject json = new JSONObject(object);
   				dto.setResult(json.toString());
   			}
   		}
   		
   		if (null != id) {
   			dto.setResourceId(id);
   		}
   		
   		return dto;
   	}
}
