import java.io.*;
import java.util.*;

public class Greedy{
	private boolean FailData = false;
	private boolean FileFound = true;
	private List<Integer> list = new List<>();
	private int Num_Of_Folders=0;
	private double Sum_Of_Folders = 0.0;

	public Greedy(){                                         //constructor
	}

	public List<Integer> Read_Data(String txtfile){
		int data=0;
		try{
			Scanner x = new Scanner(new File(txtfile));
			while(x.hasNext()){
				data = Integer.parseInt(x.next());
				list.insertAtBack(data);                      // puts data from the txt file to list
				Sum_Of_Folders += data;                       // Sum_Of_Folders = size of all folders
				Num_Of_Folders++;                  
				if(data < 0 || data > 1000000){
					FailData = true;
					break;
				}
			}
			x.close();
		}catch(FileNotFoundException e){
			FileFound = false;
		}
		return list;
	}

	public int Insert_Folders_To_Disks(String txtfile){
		if(!FileFound){
			System.out.println("Could not find file."); 
		}else if (FailData){
			System.out.println("WRONG DATA");
		}else{
			MaxPQ DisksPQ = new MaxPQ();
			DisksPQ.insert(new Disk());
			int Sum_Of_Disks = 1;
			int counter2 = 0;                                            //counter2 = how many folders are inside to a disk
			Node<Integer> iterator = list.getHead();;
			Disk tempDisk,newDisk;
			while(counter2 != Num_Of_Folders){
		        if(DisksPQ.peek().getFreeSpace() >= iterator.getData()){
		            tempDisk = DisksPQ.getMax();
		            tempDisk.Insert_Folder(iterator.getData());
		            DisksPQ.insert(tempDisk);
		            counter2++;
		        }else{
		            newDisk = new Disk();
		            newDisk.Insert_Folder(iterator.getData());
		            DisksPQ.insert(newDisk);
		            counter2++;
		            Sum_Of_Disks++;
		        }
		        iterator = iterator.getNext();
		 	}

		 	System.out.println("\t% java Greedy "+ txtfile);
		    System.out.println("\tSum of all folders = " + Sum_Of_Folders/1000000 + " TB");
		    System.out.println("\tTotal number of disks used = " + Sum_Of_Disks); 
		    for(int i=1;i<=Sum_Of_Disks;i++){
		        System.out.println("\t" + DisksPQ.peek().getID()+" "+DisksPQ.peek().getFreeSpace()+": "+DisksPQ.peek().getFolders());
		        DisksPQ.getMax();
		    }
		    return Sum_Of_Disks;
		}
		return -1;
	}

	public void Sort_List(){                                //Merge-Sort 
		Sort ob = new Sort();
        list.setHead(ob.mergeSort(list.getHead()));
	}

	public static void main(String[] args){

		String file= "";
		for (String i : args){
			file += i;
		}

		System.out.println("Greedy:");
		Greedy GreedyOb = new Greedy();
		GreedyOb.Read_Data(file);
		GreedyOb.Insert_Folders_To_Disks(file);

	}	
}