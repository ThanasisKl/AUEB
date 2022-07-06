public class Greedy_Decreasing{                                              // sorts the list and then moves the files to disks
	public static void main(String[] args){

		String file= "";
		for (String i : args){
			file += i;
		}

		System.out.println("Greedy-Decreasing:");
		Greedy GreedyOb = new Greedy();
		GreedyOb.Read_Data(file);
		GreedyOb.Sort_List();                                                      
		GreedyOb.Insert_Folders_To_Disks(file);
	}
}