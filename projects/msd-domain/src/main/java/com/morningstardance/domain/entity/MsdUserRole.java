package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the msd_user_role database table.
 * 
 */
@Entity
@Table(name="msd_user_role")
public class MsdUserRole implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private int role;

	public MsdUserRole() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRole() {
		return this.role;
	}

	public void setRole(int role) {
		this.role = role;
	}

}