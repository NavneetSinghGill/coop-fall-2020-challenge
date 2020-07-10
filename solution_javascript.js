class EventSourcer {
  constructor() {
    this.value = 0;
    this.values = [0];
    this.counter = 0;
  }

  add(num) {
    this.value = this.value + num;
    this.values = this.values.push(this.value);
    this.counter++;

    return this.value;
  }
  subtract(num) {
    this.value = this.value - num;
    this.values = this.values.push(this.value);
    this.counter++;

    return this.value;
  }
  undo() {
    if(this.counter != 0) {
      this.counter--;
      this.value = this.values[counter];
    }

    return this.value;
  }
  redo() {
    if(this.counter + 1 < this.values.length) {
      this.counter++;
      this.value = this.values[counter];
    }

    return this.value;
  }
  bulk_undo(num) {
    if(this.counter + 1 >= num) {
      this.counter = this.counter - num + 1;
      this.value = this.values[this.counter];
    } else {
      this.counter = 0;
      this.value = this.values[this.counter];
    }

    return this.value;
  }
  bulk_redo(num) {
    if(this.counter + num <= this.values.length) {
      this.counter = this.counter + num - 1;
      this.value = this.values[this.counter];
    } else {
      this.counter = this.values.length - 1;
      this.value = this.values[this.counter];
    }

    return this.value;
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
