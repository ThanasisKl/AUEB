public class DiskMain{
	public static void main(String[] args){
		Disk ob1 = new Disk();
		Disk ob2 = new Disk();
		ob1.Insert_Folder(500000);
		ob1.Insert_Folder(400000);
		System.out.println(ob1.getFolders());
		System.out.println(ob2.getFreeSpace());
	}
}