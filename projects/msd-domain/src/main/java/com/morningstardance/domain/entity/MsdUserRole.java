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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", unique=true, nullable=false, columnDefinition = "int")
	private Long id;

	private int role;

	@Column(name="user_id")
	private int userId;

	public MsdUserRole() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getRole() {
		return this.role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
}