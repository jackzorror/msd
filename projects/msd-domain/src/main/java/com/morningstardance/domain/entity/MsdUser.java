package com.morningstardance.domain.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the msd_user database table.
 * 
 */
@Entity
@Table(name="msd_user")
public class MsdUser implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	private String password;

	private int status;

	private String username;

	public MsdUser() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}