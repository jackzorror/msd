package com.morningstardance.web;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;

public class ResponseDto {

	private Long code;
   	private String message;
   	private Object result;
   	
   	public ResponseDto() {
   	}
   	
   	public ResponseDto(Long code, String message, Object result) {
   		this.code = code;
   		this.message = message;
   		this.result = result;
   	}
   	
	public Long getCode() {
		return code;
	}
	public void setCode(Long code) {
		this.code = code;
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
	static public ResponseDto createResponseDto(Object object, String requestType, String resultType) {
   		ResponseDto dto = new ResponseDto();
   		if ("GET".equals(requestType)) {
   			if (null != object && !("ARRAY" == resultType && ((List)object).size() == 0)) {
   				dto.setMessage("found");
   				dto.setCode(new Long(HttpStatus.FOUND.value()));
   			} else {
   				dto.setMessage("not found");
   				dto.setCode(new Long(HttpStatus.NOT_FOUND.value()));
   			}
   		} else if ("POST".equals(requestType)) {
   			if (null != object) {
   				dto.setMessage("created");
   				dto.setCode(new Long(HttpStatus.CREATED.value()));
   			} else {
   				dto.setMessage("not created");
   				dto.setCode(new Long(HttpStatus.INTERNAL_SERVER_ERROR.value()));
   			}
   		} else if ("PUT".equals(requestType)) {
   			if (null != object) {
   				dto.setMessage("update");
   				dto.setCode(new Long(HttpStatus.FOUND.value()));
   			} else {
   				dto.setMessage("not update");
   				dto.setCode(new Long(HttpStatus.INTERNAL_SERVER_ERROR.value()));
   			}
   		} else if ("DELETE".equals(requestType)) {
   			if (null != object) {
   				dto.setMessage("delete");
   				dto.setCode(new Long(HttpStatus.FOUND.value()));
   			} else {
   				dto.setMessage("not delete");
   				dto.setCode(new Long(HttpStatus.INTERNAL_SERVER_ERROR.value()));
   			}
   		}
   		
   		if ("ARRAY".equals(resultType)) {
   			if (null != object && ((List)object).size() > 0) {
   				JSONArray jsons = new JSONArray((List)object);
   				dto.setResult(jsons.toString());
   			}
   		} else if ("OBJECT".equals(resultType)) {
   			if (null != object) {
   				JSONObject json = new JSONObject(object);
   				dto.setResult(json.toString());
   			}
   		} else if ("BOOLEAN".equals(resultType)) {
   			dto.setResult(object.toString());
   		}
   		
   		return dto;
   	}
}
