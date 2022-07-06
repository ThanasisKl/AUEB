public class Sort{                                           // Merge-Sort

	public Node<Integer> Merge(Node<Integer> x, Node<Integer> y) 
    { 
        Node<Integer> result = null; 

        if (x == null) 
            return y; 
        if (y == null) 
            return x; 
  
        if (x.getData() > y.getData()) { 
            result = x; 
            result.setNext(Merge(x.getNext(), y));
        } 
        else { 
            result = y; 
            result.setNext(Merge(x, y.getNext())); 
        } 
        return result; 
    } 

    public Node<Integer> mergeSort(Node<Integer> node) 
    { 
        if (node == null || node.getNext() == null) { 
            return node; 
        } 
  
        Node<Integer> middleNode = getMiddleNode(node); 
        Node<Integer> next = middleNode.getNext(); 

        Node<Integer> leftNode,rightNode,sortedlist;
  
        middleNode.setNext(null); 
  
        leftNode = mergeSort(node);                             //Merge_Sort on left
   
        rightNode = mergeSort(next);                            //Merge_Sort on right
  
        sortedlist = Merge(leftNode, rightNode);                //Merges the split list
        return sortedlist; 
    }

    public static Node<Integer> getMiddleNode(Node<Integer> head)               // finds the middle node of the list
    { 
        if (head == null) 
            return head; 
  
        Node<Integer> middle = head;
        Node<Integer> last = head; 
  
        while (last.getNext() != null && last.getNext().getNext() != null) { 
            middle = middle.getNext(); 
            last = last.getNext().getNext(); 
        } 
        return middle; 
    } 

}