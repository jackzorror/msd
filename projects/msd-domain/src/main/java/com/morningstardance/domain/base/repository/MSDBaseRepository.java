package com.morningstardance.domain.base.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.morningstardance.domain.base.entity.MSDEntity;

@Transactional(propagation = Propagation.REQUIRED, timeout = 300)
public class MSDBaseRepository<T extends MSDEntity> {

	private EntityManager entityManager;

	public EntityManager getEntityManager() {
		return entityManager;
	}

	@PersistenceContext(unitName = "entityManagerFactory")
	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	/**
	 * Finds an <T> by its type and primary id.
	 * 
	 * @param aClass
	 * @param id
	 * @return <T>
	 */
	protected T findById(Class<T> aClass, Long id) {
		T result = entityManager.find(aClass, id);
		return result;
	}

	/**
	 * Saves an entity.
	 * 
	 * @param entity
	 *            the entity to save
	 * @return the persisted object
	 */
	public T save(T entity) {
		return merge(entity);
	}

	/**
	 * Merges an entity with the entity manager
	 * 
	 * @param entity
	 *            the entity to be merged
	 * @return the merged object
	 * @see EntityManager#merge(Object)
	 */
	protected T merge(T entity) {

		boolean isUpdate = false;
		if (entity.getId() != null) {
			isUpdate = true;
		}

		if (!isUpdate) {
			entityManager.persist(entity);
		} else {
			entity = entityManager.merge(entity);
		}
		return entity;
	}

	/**
	 * Deletes an entity.
	 * 
	 * @param entity
	 *            the entity to delete
	 */
	protected void delete(T entity) {
		if (!entityManager.contains(entity)) {
			entity = entityManager.merge(entity);
		}
		entityManager.remove(entity);
	}

	/**
	 * Clears the persistence context, causing all managed entities to become
	 * detached.
	 * 
	 * @see EntityManager#clear()
	 */
	protected void clear() {
		entityManager.clear();
	}

	/**
	 * Synchronizes the persistence context with the underlying database.
	 * 
	 * @see EntityManager#flush()
	 */
	protected void flush() {
		entityManager.flush();
	}

}
