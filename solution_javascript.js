class EventSourcer {
  constructor() {
    this.value = 0;
    this.values = [];
    this.counter = -1;
  }

  add(num) {
    //Replace new value
    if(this.counter + 1 != this.values.length) {
      this.value = this.value + num;
      this.counter++;
      this.values[this.counter] = num;
    } else {
      //Add new value
      this.value = this.value + num;
      this.values = this.values.concat([num]);
      this.counter++;
    }

    return this.value;
  }
  subtract(num) {
    //Replace new value
    if(this.counter + 1 != this.values.length) {
      this.value = this.value - num;
      this.counter++;
      this.values[this.counter] = num * -1;
    } else {
      //Add new value
      this.value = this.value - num;
      this.values = this.values.concat([num * -1]);
      this.counter++;
    }

    return this.value;
  }
  undo() {
    if(this.counter >= 0) {
      this.value = this.value - this.values[this.counter];
      this.counter--;
    }
    return this.value;
  }
  redo() {
    if(this.counter + 1 < this.values.length) {
      this.counter++;
      this.value = this.value + this.values[this.counter];
    }

    return this.value;
  }
  bulk_undo(num) {
    //If all undo's requested can be done
    if(this.counter + 1 >= num) {
      for(let i = 0; i < num; i++) {
        this.value = this.value - this.values[this.counter];
        this.counter = this.counter - 1;
        // console.log(this.counter);
      }
    } else {
      //If not all requested undo's are possible
      for(let i = this.counter-1; i >= 0; i--) {
        this.value = this.value - this.values[this.counter];
      }
      this.counter = -1;
    }

    return this.value;
  }
  bulk_redo(num) {
    //If all redos can be served
    console.log(this.counter);
    console.log(this.value);
    console.log(this.values.length);
    if(this.counter + num <= this.values.length) {
      for(let i = 0; i < num; i++) {
        this.counter = this.counter + 1;
        this.value = this.value + this.values[this.counter];     
        console.log(",");
        console.log(this.value);
      }
    } else {
      for(let i = this.counter; i < this.values.length-1; i++) {
        this.counter = this.counter + 1;
        this.value = this.value + this.values[this.counter];
        console.log(".");
        console.log(this.value);
      }
    }

    return this.value;
  }
}
let sourcer = new EventSourcer();
sourcer.add(5);
sourcer.add(5);
sourcer.add(5);
sourcer.add(5);
sourcer.add(5);
sourcer.undo();
sourcer.undo();
sourcer.undo();
sourcer.bulk_redo(5);
// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
