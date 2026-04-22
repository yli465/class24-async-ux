function frogThinkThenDo(action) {
  console.log("  thinking...");
  if (action) {
    action();
  }
}

const eatFly = () => {
  console.log("  eating fly...")
}

function drinkWater() {
  console.log("  drinking water...")
}

console.log("1. EAT")
frogThinkThenDo(eatFly)

console.log("2. DRINK")
frogThinkThenDo(drinkWater);

console.log("3. CHAT")
frogThinkThenDo(function () { console.log("  chatting with friends...") })

console.log("4. HOP")
frogThinkThenDo(() => console.log("  hopping..."))

console.log("5. SLEEP")
frogThinkThenDo((() => console.log("  sleeping...")))
