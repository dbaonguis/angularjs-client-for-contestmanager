package com.angularjs4contestmanager.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.angularjs4contestmanager.domain.JSession;

@Repository
public interface JSessionRepository extends CrudRepository<JSession, Long> {

	JSession findById(Long id);
	
	JSession findFirstByOrderByIdDesc();
}