function dragBasket(basket) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    basket.onmousedown = dragMouseDown;  

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // prendi la posizione iniziale del mouse
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // chiama questa funzione ogni volta che il mouse si muove
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calcola la nuova posizione del mouse
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // setto la nuova posizione dell'elemento
        basket.style.top = (basket.offsetTop - pos2) + "px";
        basket.style.left = (basket.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}