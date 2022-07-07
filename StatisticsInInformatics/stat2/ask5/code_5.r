x3 <- c(80,81,75,83,71,73,65,67,54,77,55,83,91,92,86,73,82,69,73,70,59,68,72,72)
m <- c(80,81,75,83,73,77,91,92,86,73,68,72,72)
f <- c(71,65,67,54,55,83,73,82,69,70,59)

mean(m)-> mean_m
mean(f)-> mean_f

sd(m)-> sd_m
sd(f)-> sd_f

t.test(m,f,conf.level = 0.8)

smokers <- c(80,83,71,73,65,77,92,86,82,59)
not_smokers <- c(81,75,67,54,55,83,91,73,69,73,70,68,72,72)

t.test(smokers,not_smokers)