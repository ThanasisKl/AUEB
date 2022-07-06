public class mainList{
	public static void main(String[] args){
		ListInterface<String> list = new List<>();

        try {

            System.out.println(list.toString());

            list.insertAtFront("Iasonas");
            System.out.println(list.toString());

            list.insertAtFront("Thanasis");
            System.out.println(list.toString());

            list.insertAtBack("ergasia2");
            System.out.println(list.toString());

            System.out.println("--removeFromFront--");
            list.removeFromFront();
            System.out.println(list.toString());

            System.out.println("--removeFromBack--");
            list.removeFromBack();
            System.out.println(list.toString());

        } catch (EmptyListException ex) {
            System.out.println("Tried to remove from an empty list!");
        }

	}
}