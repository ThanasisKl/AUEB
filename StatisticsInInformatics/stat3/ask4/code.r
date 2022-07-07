read.table('askhsh4.txt',header = TRUE, sep = '\t',stringsAsFactors = TRUE) -> data
#H0:p1>p2, Ha p1<=p2
sum(Color == "red")/80 -> p1
sum(Color == "blue")/80 -> p2
(sum(Color == "blue") + sum(Color == "red"))/80 -> p
z <- (p1-p2) / sqrt((p*(1-p))/(sum(Color == 'red'))+(p*(1-p))/(sum(Color == 'blue')))
pnorm(z)
#pvalue πολύ μεγάλο οπότε δεν μπορούμε να απορρίψουμε την H0