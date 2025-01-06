debugger;

function test() {
  if (true) {
    var x = 10;
    let y = 20;
    const z = 30;
  }
  console.log(x); // 10
  console.log(y); // ReferenceError
  console.log(z); // ReferenceError
}
test();
