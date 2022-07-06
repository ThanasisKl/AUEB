import java.util.Scanner;
import java.io.*;
public class Thiseas{
	
	private static boolean topFlag = false;
	private static boolean botFlag = false;
	private static boolean rightFlag = false;
	private static boolean leftFlag = false;
	private static boolean crossroad = false;
	private Scanner x;
	    
	public void Open_File(){
		try{
			x = new Scanner(new File("file1.txt"));
		}catch(Exception e){
			System.out.println("Could not find file."); 
		}
	}
	
	public void Maze_Solver(){
			StringStack<Point> S = new StringStackImpl<>();
			int lines = Integer.parseInt(x.next());
			int columns = Integer.parseInt(x.next());
			int point1 = Integer.parseInt(x.next());
			int point2 = Integer.parseInt(x.next());
			
			String[][] array = new String[lines][columns];
		try{               // elegxei thn periptvsh  poy ta stoixeia einai ligotera apo oti leei h prwth grammh tou txt arxeiou                                       
				
			for (int i = 0; i < lines; i++){                // ftiaxnei ton pinaka apo to arxeio txt
				for (int j = 0; j < columns; j++){
					array[i][j] = x.next().trim();
				}
			}
			
			try{                // elegxei thn periptvsh  poy ta stoixeia einai perissotera apo oti leei h prwth grammh tou txt arxeiou
				if (x.next().equals("1") || x.next().equals("0") || x.next().equals("E")){ // an den einai kanei print auto to mhnuma
					System.out.println("WRONG DATA : file1.txt") ;
				}
			}catch(Exception e){                                                 //an einai swsto to txt arxeio mpainei edw
				if (!array[point1][point2].equals("E")){      // an to E den einai sthn thesh poy prepei tote enhmerwnei ton xrhsth me katallhlo mhnuma 
					System.out.println("Could not find E") ;
				}else{                        //den uparxei lathos sto arxeio txt kai apo edw kai pera arxizei o algorithmos gia to maze
					int E1 = point1;
					int E2 = point2;
					boolean flag = true;
					int crossL = -1;
					int crossC = -1;
					while (true && flag){
						if (neib(array,E1,E2) == 1){
							if(topFlag){
								if (crossroad)
									S.push(new Point(E1,E2));
								array[E1][E2] = "1";	
								E1 -= 1;
								if (crossroad)
									S.push(new Point(E1,E2));
								array[E1][E2] = "1";
							}else if(botFlag){
								if (crossroad)
									S.push(new Point(E1,E2));
								array[E1][E2] = "1";
								E1 += 1 ;
								if (crossroad)
									S.push(new Point(E1,E2));
								array[E1][E2] = "1";
							}else if(rightFlag){
								if (crossroad)
									S.push(new Point(E1,E2));
								array[E1][E2] = "1";
								E2 += 1;
								array[E1][E2] = "1";
							}else if(leftFlag){
								array[E1][E2] = "1";
								E2 -= 1;
								if (crossroad)
									S.push(new Point(E1,E2));
								array[E1][E2] = "1";
							}
							if(E1 == 0 || E2 == 0 || E1 == lines-1 || E2 == columns-1){
								System.out.println("EXIT -> ("+E1+","+E2+")");
								break;
							}

						}else if (neib(array,E1,E2) >= 2){
							crossL = E1;
							crossC = E2;
							if(topFlag){
								S.push(new Point(E1,E2));
								array[E1][E2] = "1";	
								E1 -= 1;
								S.push(new Point(E1,E2));
								array[E1][E2] = "1";
							}else if(botFlag){
								S.push(new Point(E1,E2));
								array[E1][E2] = "1";
								E1 += 1 ;
								S.push(new Point(E1,E2));
								array[E1][E2] = "1";
							}else if(rightFlag){
								S.push(new Point(E1,E2));
								array[E1][E2] = "1";
								E2 += 1;
								S.push(new Point(E1,E2));
								array[E1][E2] = "1";
							}else if(leftFlag){
								array[E1][E2] = "1";
								S.push(new Point(E1,E2));
								E2 -= 1;
								S.push(new Point(E1,E2));
								array[E1][E2] = "1";
							}
							if(E1 == 0 || E2 == 0 || E1 == lines-1 || E2 == columns-1){
								System.out.println("EXIT -> "+E1+" "+E2);
								break;
							}
						}else if (neib(array,E1,E2) == 0){
								while(!(neib(array,S.peek().getLine(),S.peek().getColumn()) != 0)){
											S.pop();
											if (S.isEmpty()){
												System.out.println("EXIT DOES NOT EXIST");
												flag = false;
												break;
											}
											E1 = S.peek().getLine();
											E2 = S.peek().getColumn();
											if (E1 == crossL && E2 == crossC)
												crossroad = false;
								}
						}
						topFlag = false;
						botFlag = false;
						leftFlag = false;
						rightFlag = false;
						
					}
				}
			}
		}catch(Exception e){ 
			System.out.println("WRONG DATA : file.txt") ;
		}        
	}
	
	public void Close_File(){
		x.close();
	}
	
	public static int neib(String[][] array,int line,int column){
		int sum = 0;
		if(line-1 >= 0)
			if(array[line-1][column].equals("0")){
				sum +=1;
				topFlag = true;
			}
		if(line+1 < array.length)
			if(array[line+1][column].equals("0")){
				sum +=1;
				botFlag = true;
			}
		if(column-1 >= 0)
			if(array[line][column-1].equals("0")){
				sum +=1;
				leftFlag = true;
			}
		if(column+1 < array[0].length)
			if(array[line][column+1].equals("0")){
				sum +=1;
				rightFlag = true;
			}
		
		return sum;
	}

	public static void main(String[] args){
		Thiseas r = new Thiseas();
		r.Open_File();
		r.Maze_Solver();
		r.Close_File();
	}
}