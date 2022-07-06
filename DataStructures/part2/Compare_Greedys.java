import java.util.Random; 
import java.io.FileWriter;
import java.io.File;
import java.io.IOException;

public class Compare_Greedys{
	public static void main(String[] args) {
		Random rand = new Random();
		FileWriter writer = null;
		int randomNum; 
		try{ 
	
			for(int j = 1;j<=10;j++){
				writer = new FileWriter(new File("folder"+j+"(N=100).txt"));
				for(int i = 1; i <= 100;i++){
					randomNum = rand.nextInt(1000001);  
					writer.write(randomNum+"\n");
				} 
				writer.close();
			}
			
			
			for(int j = 1;j<=10;j++){
				writer = new FileWriter(new File("folder"+j+"(N=500).txt"));
				for(int i = 1; i <= 500;i++){
					randomNum = rand.nextInt(1000001);  
					writer.write(randomNum+"\n");
				} 
				writer.close();
			}

	
			for(int j = 1;j<=10;j++){
				writer = new FileWriter(new File("folder"+j+"(N=1000).txt"));
				for(int i = 1; i <= 1000;i++){
					randomNum = rand.nextInt(1000001);  
					writer.write(randomNum+"\n");
				} 
				writer.close();
			}

			int GDisks100 = 0;
			int GDdisks100 = 0;

			for(int j = 1;j<=10;j++){
				Greedy GreedyOb = new Greedy();
				GreedyOb.Read_Data("folder"+j+"(N=100).txt");
				GDisks100 += GreedyOb.Insert_Folders_To_Disks("folder"+j+"(N=100).txt");    // 	method Insert_Folders_To_Disks returns how many Disks Used

				GreedyOb.Sort_List();
				GDdisks100 += GreedyOb.Insert_Folders_To_Disks("folder"+j+"(N=100).txt");
			}

			int GDisks500 = 0;
			int GDdisks500 = 0;
			for(int j = 1;j<=10;j++){
				Greedy GreedyOb = new Greedy();
				GreedyOb.Read_Data("folder"+j+"(N=500).txt");
				GDisks500 += GreedyOb.Insert_Folders_To_Disks("folder"+j+"(N=500).txt");

				GreedyOb.Sort_List();
				GDdisks500 += GreedyOb.Insert_Folders_To_Disks("folder"+j+"(N=500).txt");
			}

			int GDisks1000 = 0;
			int GDdisks1000 = 0;
			for(int j = 1;j<=10;j++){
				Greedy GreedyOb = new Greedy();
				GreedyOb.Read_Data("folder"+j+"(N=1000).txt");
				GDisks1000 += GreedyOb.Insert_Folders_To_Disks("folder"+j+"(N=1000).txt");

				GreedyOb.Sort_List();
				GDdisks1000 += GreedyOb.Insert_Folders_To_Disks("folder"+j+"(N=1000).txt");
			}
			System.out.println("------------------------------------------------------------------");
			System.out.println("Class Greedy used "+GDisks100/10.0+" Disks(N=100)");
			System.out.println("Class Greedy_Decreasing used "+GDdisks100/10.0+" Disks(N=100)");
			System.out.println("------------------------------------------------------------------");
			System.out.println("Class Greedy used "+GDisks500/10.0+" Disks(N=500)");
			System.out.println("Class Greedy_Decreasing used "+GDdisks500/10.0+" Disks(N=500)");
			System.out.println("------------------------------------------------------------------");  
			System.out.println("Class Greedy used "+GDisks1000/10.0+" Disks(N=1000)");
			System.out.println("Class Greedy_Decreasing used "+GDdisks1000/10.0+" Disks(N=1000)");
			System.out.println("------------------------------------------------------------------");


		}catch (IOException e) {
			System.err.println("Error Writing File.");
		}	 
	}
}