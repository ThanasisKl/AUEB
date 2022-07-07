#a)
p = 29/50
p + c(-1,1)*1.96*sqrt((p*(1-p))/50)


#b)
#H0: p=0.5 Ha: p!=0.5
z = (p-0.5)/sqrt((0.5*0.5)/50)
pvalue = 2*pnorm(-abs(z))
pvalue
#pvalue > a -> we cant reject H0

#c) 
n = ((1.96*1.96)*(0.5*0.5))/(0.01*0.01)
n