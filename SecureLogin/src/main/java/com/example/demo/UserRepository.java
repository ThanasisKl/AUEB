package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public interface UserRepository extends JpaRepository<User, String> {   //data access layer
    @Query(value = "SELECT u FROM User u WHERE u.username=?1")
    public User findByUsername(String username);

    @Modifying
    @Query(value = "UPDATE users SET fail_attempts =?2 WHERE username =?1", nativeQuery = true)
    @Transactional
    public void updateUsersFailAttempts(String username,int failAttempts);

    @Modifying
    @Query(value = "UPDATE users SET account_locked =?2 WHERE username =?1", nativeQuery = true)
    @Transactional
    void updateAccountNonLocked(String username,String locked);

    @Modifying
    @Query(value = "UPDATE users SET lock_time =?2 WHERE username =?1", nativeQuery = true)
    @Transactional
    void updateDateOfLock(String username,Date locked_date);

    @Modifying
    @Query(value = "UPDATE users SET last_time_password_changed =?2 WHERE username =?1", nativeQuery = true)
    @Transactional
    void updateLast_time_password_changed(String username, Date date);

}