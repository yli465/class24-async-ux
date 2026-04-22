function turnOnOven(thenDo) {
  console.log("oven on")
  if (thenDo) {
    thenDo()
  }
}

function bakeCake() {
  console.log('baking cake')
}

turnOnOven(bakeCake);
