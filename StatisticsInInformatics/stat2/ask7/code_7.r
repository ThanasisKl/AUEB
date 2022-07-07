s <- c(500, 1550, 1250, 1300, 750 ,1000, 1250, 1300, 800, 2500)
e <- c(400, 1500, 1300, 1300, 800, 800, 1000 ,1100, 650, 2200)
s_e <- s-e
s_e

#Ho: Mo=0   Ha: Mo>0 
t.test(s_e,alternative = "greater")
# p-value poly mikro opote mporoyme na kanoume reject thn Ho

