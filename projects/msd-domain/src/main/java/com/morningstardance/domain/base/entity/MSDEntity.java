package com.morningstardance.domain.base.entity;

public interface MSDEntity {

	public Long getId();
	public void setId(Long id); 
	
	/**
	 * Get a URI to uniquely identify the entity
	 * @return
	 */
	public String getUri();

}
