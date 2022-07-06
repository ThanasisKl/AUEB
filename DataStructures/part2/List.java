public class List<T> implements ListInterface<T>{

    private Node<T> head = null;
    private Node<T> tail = null;


    public List() {
    }


    public boolean isEmpty() {
        return head == null;
    } 

    public void insertAtFront(T data) {
        Node<T> n = new Node<>(data);

        if (isEmpty()) {
            head = n;
            tail = n;
        } else {
            n.setNext(head);
            head = n;
        }
    }

    public void insertAtBack(T data) {
        Node<T> n = new Node<>(data);

        if (isEmpty()) {
            head = n;
            tail = n;
        } else {
            tail.setNext(n);
            tail = n;
        }
    }

    public T removeFromFront() throws EmptyListException {
        if (isEmpty())
            throw new EmptyListException();

        T data = head.getData();

        if (head == tail)
            head = tail = null;
        else
            head = head.getNext();

        return data;
    }

    public T removeFromBack() throws EmptyListException {
        if (isEmpty())
            throw new EmptyListException();

        T data = tail.getData();

        if (head == tail)
            head = tail = null;
        else {
            Node<T> iterator = head;
            while (iterator.getNext() != tail)
                iterator = iterator.getNext();

            iterator.setNext(null);
            tail = iterator;
        }

        return data;
    }

    public Node<T> getHead() {
        return head;
    }

    public void setHead(Node<T> h) {
        head = h;
    }

    public String toString() {
        if (isEmpty()) {
            return "List is empty ";
        }

        Node current = head;

        StringBuilder ret = new StringBuilder();

        while (current != null) {
            ret.append(current.data.toString());

            if (current.getNext() != null)
                ret.append(" ");

            current = current.next;
        }

        return ret.toString();
    }
}
