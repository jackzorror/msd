package com.morningstardance.domain.base.entity;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;

@SuppressWarnings("serial")
@MappedSuperclass
public abstract class MSDEntityBase implements MSDEntity, Serializable {

	/**
	 * Get a URI to uniquely identify the entity
	 * @return
	 */		
	  public String getUri() {
	        return this.getClass().getName() + ":" + getId();
	  }

}
