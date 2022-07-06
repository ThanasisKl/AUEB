import java.util.Comparator;

public class Disk{

	private static int numOfObjects = 0;
	private int SizeOfDisk;
	private int id = numOfObjects;
	private ListInterface<Integer> folders;

	public Disk(){
		numOfObjects++;
		this.id =id;
		folders = new List<>();
		SizeOfDisk = 1000000;
	}

	public int getFreeSpace(){
		return SizeOfDisk;
	}

	public int compareTo(Disk otherDisk) {
    	if (this.getFreeSpace() > otherDisk.getFreeSpace()){
    		return 1;
    	}else if(this.getFreeSpace() < otherDisk.getFreeSpace()){
    		return -1;
    	}
        return 0;
    }

    public void Insert_Folder(int folderSize){
    	folders.insertAtBack(folderSize);
    	SizeOfDisk -= folderSize;
    }

    public String getFolders(){
    	if (folders.isEmpty()) return "THERE ARE NO FOLDERS IN THE DISK ";
    	return folders.toString();

    }

    public String getID(){
    	return "id " + id;
    }

}