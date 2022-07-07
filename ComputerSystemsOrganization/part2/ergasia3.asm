# ATHANASIOS KLETTAS : 3180079
# IASON ZIOGAS       :3180057

.data
	hash:	        .space 40
	mess:	        .asciiz " Menu"
	mess1:	        .asciiz "\n1.Insert Key"
	mess2:	        .asciiz "\n2.Find Key"
	mess3:	        .asciiz "\n3.Display Hash Table"
	mess4:	        .asciiz "\n4.Exit\n"
	Key0:           .asciiz "key must me greater than zero"
	newKey:         .asciiz "Give new key (greater than zero): "
	searchKey:      .asciiz "Give key to search for: "
	KeyNotFound:    .asciiz "Key not in hash table.\n"
	KeyValue:       .asciiz "Key value = "
	position:       .asciiz "Table position = "
	display:        .asciiz "\npos key\n"
	space:          .asciiz " "
	CRLF:		.asciiz "\n"
	alreadyExist:   .asciiz "Key is already in hash table.\n"
	fulltable:      .asciiz "hash table is full\n"
	lines:          .asciiz "----------------------------------------\n"
.text
.globl main
main:
	addi $t0,$0,0         #i=0
	addi $t1,$0,0         #pos=0
loop:
	bgt $t0,10,exit_loop  #if (i > 10) goto exit_loop
	sw $0,hash($t1)	      #hash[pos] = 0
	addi $t1,$t1,4        #pos += 4
	addi $t0,$t0,1	      #i++
	j loop
exit_loop:
	addi $t9,$0,0
	addi $t0,$0,0         #key
	addi $t1,$0,0         #pos
	addi $t2,$0,0	      #choice
	addi $t3,$0,0         #telos
while:	
	bne $t3,0,exit
	
	la $a0,lines          #print("----------------------------------------\n")
	li $v0,4
	syscall
	
	la $a0,mess           #print(" Menu")
	li $v0,4
	syscall
	
	la $a0,mess1          #print("1.Insert Key")
	li $v0,4
	syscall
	
	la $a0,mess2          #print("2.Find Key")
	li $v0,4
	syscall
	
	la $a0,mess3          #print("3.Display Hash Table")
	li $v0,4
	syscall
	
	la $a0,mess4          #print("4.Exit")
	li $v0,4
	syscall
	
	la $a0,lines          #print("----------------------------------------\n")
	li $v0,4
	syscall
	
	li $v0,5              #readInt(Choice)
	syscall
	
	move $t2,$v0
	
	la $a0,lines          #print("----------------------------------------\n")
	li $v0,4
	syscall
	
	beq $t2,1,choice1     #if (choice == 1) goto choice1
	j maybe2
choice1:
       la $a0,newKey          #print("Give new key (greater than zero): ")
       li $v0,4
       syscall
       
       li $v0,5               #readInt(key)
       syscall
       
       move $t0,$v0
       
       ble $t0,0,else1        #if (key <= 0) goto else1     
       jal insertkey          # call procedure insertkey
       
       j while            
else1:
	la $a0,Key0           #print("key must me greater than zero")
	li $v0,4
	syscall
maybe2:
	beq $t2,2,choice2     #if (key == 2) goto choice2
	j maybe3              
choice2:
       la $a0,searchKey       #print("Give key to search for: ")
       li $v0,4
       syscall
	
       li $v0,5               #readInt(keyforsearch)   
       syscall
       
       move $t0,$v0
       
       jal findkey            #call procedure findkey
       			      #after procedure findkey $t4 = pos
       bne $t4,-1,else2       #if (pos != -1) goto else2
       
       la $a0,KeyNotFound     #print("Key not in hash table.\n")
       li $v0,4
       syscall
       j while
else2:
       la $a0,KeyValue        #print("Key value = ")
       li $v0,4
       syscall 
     
       mul $s1,$t4,4
       lw $t5,hash($s1)
       move $a0,$t5      
       li $v0,1              #print(hash[pos])
       syscall
       
       la $a0,CRLF           #print("\n")
       li $v0,4
       syscall 
       
       la $a0,position       #print("Table position = ")
       li $v0,4
       syscall
       
       move $a0,$t4          #print(pos)
       li $v0,1
       syscall
       
       la $a0,CRLF           #print("\n")
       li $v0,4
       syscall 
       
       j while
maybe3:
	beq $t2,3,choice3    #if (choice == 3) goto choice3
	j maybe4
choice3:
	jal displaytable     #call procedure displaytable
	j while
maybe4:
	beq $t2,4,choice4    #if (choice == 4) goto choice4
	j while
choice4:
	addi $t3,$0,1        #telos = 1   
	j while
exit:
	li $v0,10            #signal end of program
	syscall
	
#----------------------------------procedures----------------------------------------------------------------------------	

#procedure insertkey
insertkey:
	addi $sp,$sp,-4
	sw $ra,0($sp)
	
	jal findkey
	
	beq $t4,-1,else3       #if (position == -1) goto else3
	
	la $a0,alreadyExist    #print("Key is already in hash table.")
	li $v0,4
	syscall
	j end
   else3:
	bge $t9,10,else4      #if (keys >= 10) goto else4
	jal hashfunction
	
	mul $s1,$t4,4
	sw $t0,hash($s1)      #hash[position] = k
	addi $t9,$t9,1        #keys++
	j end
   else4:
        la $a0,fulltable      #print("hash table is full")
        li $v0,4
        syscall
   end:	
        lw $ra,0($sp)
	addi $sp,$sp,4
 
	jr $ra                #return	
	
	
#procedure hashfuction	
hashfunction:
	rem $t4,$t0,10        #position = k % N
	mul $s1,$t4,4
while3:
	lw $t7,hash($s1)
	beq $t7,0,exit_while3 #if (hash[position] == 0) goto exit_while3
	addi $t4,$t4,1        #position++
	rem $t4,$t4,10        #position %= N
	mul $s1,$t4,4
	j while3
exit_while3:
	jr $ra                #return
	
	
	
#procedure findkey	
findkey:
	addi $t6,$0,0          #i=0
	addi $t7,$0,0          #found=0
	rem $t4,$t0,10
	mul $s1,$t4,4
while2:
	bge $t6,10,exit_while2 #if (i >= 10) goto exit_while2
	bne $t7,0,exit_while2  #if (found != 0) goto exit_while2
	addi $t6,$t6,1         #i++
	lw $t8,hash($s1)
	bne $t8,$t0,else       #if (hash[position] != k) goto else
	addi $t7,$0,1          #found = 1
	j while2
else:
	addi $t4,$t4,1         #position++
	rem $t4,$t4,10 
	mul $s1,$t4,4          #position %= 10
	j while2
exit_while2:
	bne $t7,1,not_found    #if (found != 1) goto not_found
	j found
not_found:
	addi $t4,$0,-1         #position = -1
found:
	jr $ra                 #return
	
	
	
#procedure displaytable	
displaytable:
	addi $t6,$0,0          #i=0
	addi $t8,$0,0          #position
	
	la $a0,display         #print("\npos key\n")
	li $v0,4
	syscall
for:
	bge $t6,10,exit_for    #if (i>=n) goto exit_for
	
	la $a0,space           #print(" ")
	li $v0,4
	syscall
	
	move $a0,$t6           #print(i)
	li $v0,1
	syscall
	
	la $a0,space           #print(" ")
	li $v0,4
	syscall
	
	lw $t7,hash($t8)       #print(hash[i])
	move $a0,$t7
	li $v0,1
	syscall
	
	addi $t6,$t6,1         #i++
	addi $t8,$t8,4         #position += 4
	
	la $a0,CRLF            #print("\n")
	li $v0,4
	syscall
	
	j for
exit_for:
	
	jr $ra                  #return
	
	
	

	
       
	
       
       
	
	
	
		 
		 
		 
		 
		
