.data 
	enterN:            .asciiz "Enter number of objects in the set (n) :  "
	enterK:     	   .asciiz "Enter number to the chosen (k) : "
	ErrMessage:  	   .asciiz "Please enter n >= k >= 0"
	message1:   	   .asciiz "C("
	message2:    	   .asciiz " ,"
	message3:          .asciiz ") = "
	factorial_n:       .word 1
	factorial_k:       .word 1
	factorial_n_k:     .word 1
	i:                 .word 1
	i2:                .word 1
	i3:                .word 1

.text
.globl main
	main:
		# Print message enterN
		li $v0,4
		la $a0,enterN 
		syscall
		
		# Input n
		li $v0,5
		syscall
		
		# Store n to register t0
		move $t0,$v0
		
		# Print message enterK
		li $v0,4
		la $a0,enterK
		syscall
		
		# Input k
		li $v0,5
		syscall
		
		# Store k to register t1
		move $t1,$v0
		
		 # if n < k goto e1se
		 blt $t0,$t1,else
		 # if k < 0 goto e1se
		 blt $t1,$0,else
		 
		 #print("C(")
		 li $v0,4
		 la $a0,message1
		 syscall
		 
		 #print(n)
		 li $v0,1
		 move $a0,$t0
		 syscall
		 
		 #print(" ,")
		 li $v0,4
		 la $a0,message2
		 syscall
		 
		 #print(k)
		 li $v0,1
		 move $a0,$t1
		 syscall
		 
		 #print(") = ")
		 li $v0,4
		 la $a0,message3
		 syscall
		 
		 #call procedure
		 jal combinations
		 
		 #print( n! / [ k! * (n-k)!])
		 li $v0,1
		 move $a0,$v1
		 syscall
		 
		 #finish program
		 li $v0,10
		 syscall
		 
		 #print ErrMessage
	else:    li $v0,4
		 la $a0,ErrMessage
		 syscall
		 
		 #finish program 
		 li $v0,10
		 syscall
		 
	#Procedure	 
	combinations:
		 lw $t2,factorial_n
		 lw $t3,i
	  again:
	  	 #if  i > n goto exit
		 bgt $t3,$t0,exit
		 #factiorial_n *= i
		 mul $t2,$t2,$t3
		 #i += 1
		 add $t3,$t3,1
		 j again
	  exit:
	       
	         lw $t4,factorial_k
		 lw $t3,i2
	  again2:
		 bgt $t3,$t1,exit2
		 mul $t4,$t4,$t3
		 add $t3,$t3,1
		 j again2
	 exit2:
	         lw $t5,factorial_n_k
		 lw $t3,i3
		 sub $t6,$t0,$t1
	 again3:
		 bgt $t3,$t6,exit3
		 mul $t5,$t5,$t3
		 add $t3,$t3,1
		 j again3
	 exit3:
	 	  #t4 = k! * (n-k)!
	          mul $t4,$t4,$t5
	          
	          #v1 = n! / [ k! * (n-k)!]
	          div $v1,$t2,$t4
	        
	        # return to line 74
	        jr $ra
	
		 