a)
> read.table('askhsh3.txt',header = TRUE, sep = '\t',stringsAsFactors = TRUE) -> data
> attach(data)
> #H0:p1=p2 Ha:p1!=p2
> p1 = length(sex[sex == "MALE" & smoker == "YES"])/ length(sex[sex == "MALE"])
> p2 = length(sex[sex == "FEMALE" & smoker == "YES"])/ length(sex[sex == "FEMALE"])
> p <- mean(smoker == 'YES')
> z <- (p1-p2) / sqrt((p*(1-p))/(sum(sex == 'MALE'))+(p*(1-p))/(sum(sex == 'FEMALE')))
> 2*pnorm(-abs(z))
[1] 0.6023319
> #we cant reject H0

b)
> p1 = length(sex[sex == "MALE" & smoker == "YES"])/ length(sex[sex == "MALE"])
> p2 = length(sex[sex == "FEMALE" & smoker == "YES"])/ length(sex[sex == "FEMALE"])
> p1 - p2 + c(-1,1) * 1.96 * sqrt(p1*(1-p1)/sum(sex == 'MALE')+ p2*(1-p2)/sum(sex == 'FEMALE'))
[1] -0.3168743  0.1835410

c)
> chisq.test(table(sex,smoker),correct = FALSE)

        Pearson's Chi-squared test

data:  table(sex, smoker)
X-squared = 0.27149, df = 1, p-value = 0.6023
