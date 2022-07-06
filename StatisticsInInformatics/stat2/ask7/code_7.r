> s <- c(500, 1550, 1250, 1300, 750 ,1000, 1250, 1300, 800, 2500)
> e <- c(400, 1500, 1300, 1300, 800, 800, 1000 ,1100, 650, 2200)
> s_e <- s-e
> s_e
 [1] 100  50 -50   0 -50 200 250 200 150 300
> #Ho: Mo=0   Ha: Mo>0 
> t.test(s_e,alternative = "greater")

        One Sample t-test

data:  s_e
t = 2.9132, df = 9, p-value = 0.008611
alternative hypothesis: true mean is greater than 0
95 percent confidence interval:
 42.63653      Inf
sample estimates:
mean of x 
      115 

># p-value poly mikro opote mporoyme na kanoume reject thn Ho

