.data
	message1:         .asciiz "Enter number of objects in the set (n): "
	message2:         .asciiz "Enter number to be chosen (k): "
	failinput:        .asciiz "Please enter n >= k >= 0"
	firstpart:        .asciiz "C("
	secondpart:       .asciiz ", "
	thirdpart:        .asciiz ") = "
.text
    main:
    	#Displaying the message asking the user for an input
    	li $v0,4
    	la $a0,message1
    	syscall
    
    	#The input the user adds
    	li $v0,5
    	syscall 
    
    	#Storing the value of N
    	move $t0,$v0
    
     	#Displaying the message asking the user for an input
    	li $v0,4
    	la $a0,message2
    	syscall
    
    	#The input the used adds
    	li $v0,5
    	syscall 
    
   	#Storing the value of K
    	move $t1,$v0
    
    	#Checking the values of N and K
    	bgt $t1,$t0,else
    	bgt $zero,$t1,else
    	
    	jal combinations
     
    	#Displaying the message
    	li $v0,4
    	la $a0,firstpart
    	syscall
    
    	li $v0,1
    	move  $a0,$t0
    	syscall
    
    	li $v0,4
    	la $a0,secondpart
    	syscall
    
    	li $v0,1
    	move $a0,$t1
    	syscall
    
    	li $v0,4
    	la $a0,thirdpart
    	syscall
    
    	li $v0,1
    	move $a0,$v1
    	syscall
    
    	#Ending the programm
   	li $v0,10
    	syscall
    		
    	
    else:
    	li $v0,4
    	la $a0,failinput
    	syscall
    	
    	#Ending the programm
   	li $v0,10
    	syscall
    
    
    combinations:
    	#factorial_n
    	addi $t2,$zero,1
    	#factorial_k
    	addi $t3,$zero,1
    	#factorial_n_k 
    	addi $t4,$zero,1
    	#int i
    	addi $t5,$zero,1
    	addi $t8,$zero,1
    	addi $t9,$zero,1
   	#i = n-k
    	sub $t6,$t0,$t1
      
    
    loop1:
    	# if i>n goto loop2
   	bgt $t5,$t0,loop2
   	# factorial_n *= i
    	mul $t2,$t2,$t5
    	# i += 1
    	addi $t5,$t5,1
    	j loop1
    
    loop2:
    	bgt $t8,$t1,loop3
    	mul $t3,$t3,$t8
    	addi $t8,$t8,1
    	j loop2
    
     loop3:
    	bgt $t9,$t6, exit
    	mul $t4,$t4,$t9
    	addi $t9,$t9,1
    	j loop3
    
    exit:
    	# t7 = k! * (n-k)!
    	mul $t7,$t3,$t4
    	# v1 = n! / [k! * (n-k)!]
    	div $v1,$t2,$t7
    	#Returns to line 39
    	jr $ra
    
    
    
    
